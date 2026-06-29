# About terminals in browsers

This living document tracks all findings, workarounds, and lessons learned from implementing and debugging browser-based terminal emulation and Proxmox terminal integration in this project.

## Main Issues (as of May 2026)

- **Held navigation/delete corruption**: Fixed by normalizing SS3 to CSI and aggressive geometry convergence.
- **vi not full screen**: Fixed by forced geometry resends and fallback logic.
- **Prompt delay and pwsh cursor hop**: Fixed by prompt nudge and deterministic resize.

## Debugging and Lessons Learned

- Geometry/resize must be aggressively converged; browser and Proxmox can desync easily.
- Profile system was removed—bash is robust default, profile transforms not worth the complexity.
- All code changes are now well-commented for future maintainers.
- Empirical testing in bash, pwsh, and vi is essential for validation.

## Maintenance

- All three main issues are fixed and documented above.
- Maintenance is paused unless new terminal issues arise.
- If new issues appear, resume doc and debugging as before.

---

_Last updated: May 27, 2026_
