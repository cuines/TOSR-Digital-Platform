# TOSR Digital Platform v1.0-beta Release Notes

## Summary
This beta release contains the foundational scoring algorithm and the basic UI wireframes. It is for internal testing purposes only.

## Included Features
- **Scoring Algorithm**: Core logic for scoring TOSR subtests (vocabulary breadth, semantic reasoning)
  - Distinguishes correct, incorrect, and skipped responses
  - Computes raw scores per subtest and total
  - Provides anonymized data export
- **UI Wireframes**: Initial design mockups for multiple-choice question interface
  - Age‑appropriate layout for children 7+
  - Accessible touch targets and visual design

## Known Limitations
- No production‑grade data persistence
- Limited error handling
- UI is not yet interactive

## Linked Artifacts
- Merged Pull Request: [#1](https://github.com/cuines/TOSR-Digital-Platform/pull/1)
- Issue: #2 (Develop Scoring Algorithm)

## Next Steps
- Integrate scoring algorithm with UI components
- Implement secure data storage and anonymization pipeline
- Conduct usability testing with target age group

---

*This release is tagged as `v1.0-beta`. Use only for internal evaluation and development.*