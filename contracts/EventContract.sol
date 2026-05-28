// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./OracleResolver.sol";

/**
 * @title EventContract
 * @notice Binary outcome market with YES/NO shares.
 *
 * Each user can mint a YES + NO pair by depositing 1 unit of the
 * settlement token (e.g. USDC). The pair can be split, traded, and
 * burned. After resolution, the winning side redeems 1:1.
 *
 * This is a mockup. Production deployment would replace the in-memory
 * accounting with ERC-1155 shares and integrate with an off-chain
 * order book for matching, settling only deltas on-chain.
 */
contract EventContract {
    bytes32 public immutable marketId;
    OracleResolver public immutable oracle;
    uint64 public immutable closesAt;
    string public title;
    bytes32 public criteriaCID;

    // outcome: 0 = unresolved, 1 = YES, 2 = NO, 3 = invalid
    uint8 public outcome;

    mapping(address => uint256) public yesBalance;
    mapping(address => uint256) public noBalance;

    event Mint(address indexed user, uint256 amount);
    event Burn(address indexed user, uint256 amount);
    event Resolved(uint8 outcome);
    event Redeemed(address indexed user, uint256 payout);

    constructor(
        bytes32 _marketId,
        OracleResolver _oracle,
        uint64 _closesAt,
        string memory _title,
        bytes32 _criteriaCID
    ) {
        marketId = _marketId;
        oracle = _oracle;
        closesAt = _closesAt;
        title = _title;
        criteriaCID = _criteriaCID;
    }

    /// @notice Mint a YES+NO pair by depositing `amount` of settlement token (mocked).
    function mintPair(uint256 amount) external {
        require(block.timestamp < closesAt, "EventContract: closed");
        yesBalance[msg.sender] += amount;
        noBalance[msg.sender] += amount;
        emit Mint(msg.sender, amount);
    }

    /// @notice Burn a YES+NO pair to redeem the underlying token (mocked).
    function burnPair(uint256 amount) external {
        require(yesBalance[msg.sender] >= amount, "EventContract: insufficient YES");
        require(noBalance[msg.sender] >= amount, "EventContract: insufficient NO");
        yesBalance[msg.sender] -= amount;
        noBalance[msg.sender] -= amount;
        emit Burn(msg.sender, amount);
    }

    /// @notice Settle the market by pulling the result from the oracle.
    function settle() external {
        require(block.timestamp >= closesAt, "EventContract: not closed");
        require(outcome == 0, "EventContract: already resolved");
        outcome = oracle.outcomeOf(marketId);
        require(outcome != 0, "EventContract: oracle pending");
        emit Resolved(outcome);
    }

    /// @notice Redeem winning shares 1:1 against the settlement token (mocked).
    function redeem() external {
        require(outcome != 0, "EventContract: unresolved");
        uint256 payout;
        if (outcome == 1) {
            payout = yesBalance[msg.sender];
            yesBalance[msg.sender] = 0;
        } else if (outcome == 2) {
            payout = noBalance[msg.sender];
            noBalance[msg.sender] = 0;
        } else {
            // invalid: refund a YES+NO pair as the original deposit
            uint256 pair = yesBalance[msg.sender] < noBalance[msg.sender]
                ? yesBalance[msg.sender]
                : noBalance[msg.sender];
            payout = pair;
            yesBalance[msg.sender] -= pair;
            noBalance[msg.sender] -= pair;
        }
        emit Redeemed(msg.sender, payout);
    }
}
