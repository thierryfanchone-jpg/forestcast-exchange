// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title OracleResolver
 * @notice Resolves event contracts using a hybrid oracle stack:
 *   1. Chainlink price feeds for objective market data (BTC, ETH, FX, rates).
 *   2. UMA optimistic oracle for human-curated events with a dispute window.
 *   3. External press / sport-data validators (Reuters, AP, sport APIs).
 *   4. Manual admin override gated by a 48h challenge window + audit log.
 *
 * This is a mockup that records the outcome submitted by an authorised
 * resolver. A production deployment would aggregate signatures from at
 * least N-of-M independent validators before finalising.
 */
contract OracleResolver {
    address public admin;
    mapping(address => bool) public resolvers;

    // 0 unresolved, 1 YES, 2 NO, 3 invalid
    mapping(bytes32 => uint8) public outcomeOf;
    mapping(bytes32 => uint64) public proposedAt;

    uint64 public constant DISPUTE_WINDOW = 48 hours;

    event ResolverAuthorised(address indexed who);
    event OutcomeProposed(bytes32 indexed marketId, uint8 outcome, address proposer);
    event OutcomeFinalised(bytes32 indexed marketId, uint8 outcome);
    event OutcomeDisputed(bytes32 indexed marketId, address disputer);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Oracle: not admin");
        _;
    }

    modifier onlyResolver() {
        require(resolvers[msg.sender], "Oracle: not resolver");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
        resolvers[_admin] = true;
    }

    function authoriseResolver(address who) external onlyAdmin {
        resolvers[who] = true;
        emit ResolverAuthorised(who);
    }

    /// @notice Propose an outcome; finalises after the dispute window elapses.
    function propose(bytes32 marketId, uint8 outcome) external onlyResolver {
        require(outcome >= 1 && outcome <= 3, "Oracle: invalid outcome");
        require(outcomeOf[marketId] == 0, "Oracle: already finalised");
        proposedAt[marketId] = uint64(block.timestamp);
        outcomeOf[marketId] = outcome; // pending until finalise()
        emit OutcomeProposed(marketId, outcome, msg.sender);
    }

    /// @notice Anyone may flag a proposed outcome within the dispute window.
    function dispute(bytes32 marketId) external {
        require(outcomeOf[marketId] != 0, "Oracle: no proposal");
        require(
            block.timestamp <= proposedAt[marketId] + DISPUTE_WINDOW,
            "Oracle: window closed"
        );
        outcomeOf[marketId] = 0;
        proposedAt[marketId] = 0;
        emit OutcomeDisputed(marketId, msg.sender);
    }

    /// @notice Finalise the proposed outcome after the dispute window.
    function finalise(bytes32 marketId) external {
        uint8 o = outcomeOf[marketId];
        require(o != 0, "Oracle: nothing to finalise");
        require(
            block.timestamp > proposedAt[marketId] + DISPUTE_WINDOW,
            "Oracle: still disputable"
        );
        emit OutcomeFinalised(marketId, o);
    }
}
