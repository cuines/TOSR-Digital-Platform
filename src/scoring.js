/**
 * Scoring Algorithm for TOSR Digital Platform
 * 
 * This module computes raw scores for TOSR subtests.
 * Each item is scored as correct (1), incorrect (0), or skipped (null).
 * The total raw score is the sum of correct responses.
 */

class ScoringAlgorithm {
  constructor(subtestItems) {
    this.subtestItems = subtestItems; // array of item objects
    this.responses = []; // array of { itemId, selectedOption, responseTime, skipped }
    this.rawScore = 0;
    this.subtestScores = {
      vocabularyBreadth: 0,
      semanticReasoning: 0
    };
  }

  /**
   * Record a response for a specific item.
   * @param {string} itemId - Unique identifier for the item
   * @param {number} selectedOption - Index of chosen option (0‑3)
   * @param {number} responseTime - Response latency in milliseconds
   * @param {boolean} skipped - Whether the item was skipped
   */
  recordResponse(itemId, selectedOption, responseTime, skipped = false) {
    this.responses.push({
      itemId,
      selectedOption,
      responseTime,
      skipped
    });
  }

  /**
   * Compute raw scores based on recorded responses.
   * Assumes each item has a correctAnswer property (0‑3).
   */
  computeScores() {
    let vocabCorrect = 0;
    let reasoningCorrect = 0;

    for (const resp of this.responses) {
      const item = this.subtestItems.find(it => it.id === resp.itemId);
      if (!item) continue;

      if (resp.skipped) {
        // Skipped items do not contribute to raw score
        continue;
      }

      if (resp.selectedOption === item.correctAnswer) {
        // Correct answer
        if (item.subtest === 'vocabularyBreadth') {
          vocabCorrect++;
        } else if (item.subtest === 'semanticReasoning') {
          reasoningCorrect++;
        }
      }
      // Incorrect answers contribute 0, so no increment
    }

    this.subtestScores.vocabularyBreadth = vocabCorrect;
    this.subtestScores.semanticReasoning = reasoningCorrect;
    this.rawScore = vocabCorrect + reasoningCorrect;

    return {
      rawScore: this.rawScore,
      subtestScores: this.subtestScores,
      totalItems: this.responses.length
    };
  }

  /**
   * Export anonymized response data (PII removed).
   * @returns {Object} Anonymized data object
   */
  exportAnonymizedData() {
    return {
      responses: this.responses.map(r => ({
        itemId: r.itemId,
        selectedOption: r.selectedOption,
        responseTime: r.responseTime,
        skipped: r.skipped
      })),
      scores: this.subtestScores,
      rawScore: this.rawScore,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = ScoringAlgorithm;