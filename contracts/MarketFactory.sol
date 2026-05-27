// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./EventContract.sol";
import "./OracleResolver.sol";

/**
 * @title MarketFactory
 * @notice Deploys EventContract instances for new prediction markets on Forecaxt.
 *
 * Each market is parameterised by:
 *   - a human-readable title and IPFS pointer to its resolution criteria
 *   - the address of the OracleResolver that will publish the outcome
 *   - a closing timestamp after which trading halts and the oracle window opens
 *
 * The factory is the canonical on-chain registry of Forecaxt markets and is
 * used by the backend to verify that resolution results originate from a
 * legitimate market contract before propagating to the order book.
 */
contract MarketFactory {
    address public immutable admin;
    OracleResolver public immutable oracle;

    event MarketCreated(
        bytes32 indexed marketId,
        address indexed market,
        address indexed creator,
        string title,
        bytes32 criteriaCID,
        uint64 closesAt
    );

    mapping(bytes32 => address) public marketOf;

    constructor(address _admin, OracleResolver _oracle) {
        admin = _admin;
        oracle = _oracle;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "MarketFactory: not admin");
        _;
    }

    /**
     * @notice Create a new event contract.
     * @param title       Display title (kept on-chain for transparency).
     * @param criteriaCID IPFS CID hash of the resolution criteria document.
     * @param closesAt    UNIX timestamp at which trading stops.
     * @return market     Address of the freshly deployed EventContract.
     */
    function createMarket(
        string calldata title,
        bytes32 criteriaCID,
        uint64 closesAt
    ) external onlyAdmin returns (address market) {
        require(closesAt > block.timestamp, "MarketFactory: closesAt in past");
        bytes32 marketId = keccak256(abi.encodePacked(title, criteriaCID, closesAt));
        require(marketOf[marketId] == address(0), "MarketFactory: duplicate");

        EventContract impl = new EventContract(marketId, oracle, closesAt, title, criteriaCID);
        market = address(impl);
        marketOf[marketId] = market;

        emit MarketCreated(marketId, market, msg.sender, title, criteriaCID, closesAt);
    }
}
