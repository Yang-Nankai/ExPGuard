# User Tier Implementation Tracking

This document tracks the implementation of the multi-tier system (Basic, Pro, Elite, Enterprise) across the Capsule Hub frontend.

| Feature | Basic | Pro | Elite / Enterprise |
| :--- | :--- | :--- | :--- |
| **Capsule Limit** | 5 | 15 | Unlimited / Custom |
| **Team View** | Hidden | Joinable Only | Create & Admin |
| **Versioning** | No (Direct Create) | Yes (Partial) | Yes (Full) |
| **Attachments** | No | Yes | Yes |
| **Dynamic Context** | No | No | Yes |

## Implementation Details

### 1. Backend Core Integration (`background.js`)
- **Tier Fetching**: Updated `GET_USER_TEAMS` message handler to fetch and return the `tier` from the `getsingleUser` endpoint during team fetching and login.
- **Storage**: User tier is now saved in `chrome.storage.local` under the key `tier` upon login (`LOGIN`, `GOOGLE_LOGIN`) and when syncing teams.
- **Error Propagation**: Intercepts HTTP 403 Forbidden responses from critical creation endpoints and returns a specialized `upgrade_required` error code to the UI.

### 2. UI Gating & Tier Logic (`popup.js` / `popup.html`)
- **Team Management**:
    - Basic users see a "No teams" message and clear list, even if joined to teams via other platforms.
    - Basic and Pro users are blocked from opening the "Create Team" view with a prompt to upgrade.
    - Team filters in the capsule library are hidden for Basic users.
- **Capsule Generation**:
    - Basic users skip the version check entirely. When they click "Generate", a new capsule is always created without prompting for a version.
- **Upgrade Prompts**:
    - Global handling for `upgrade_required` errors showing a plan upgrade alert.

### 3. Feature Enforcement (`content.js`)
- **Dynamic Context (Semantic Filter)**:
    - The Dynamic Context toggle/row is hidden from the injected menu for Basic and Pro users.
    - The semantic watcher (`initFastFilterWatcher`) is bypassed for Basic/Pro, preventing automatic context injection regardless of the toggle state.
- **Attachments Flow**:
    - Disabled harvesting of attachments from chat threads when generating a capsule for Basic users.
    - Disabled the attachment selection dialog during capsule injection (Drop flow) for Basic users.

### 4. Background Enforcement (`background.js`)
- **Semantic Filter**: `checkRelevance` now explicitly verifies the `tier` from storage and restricts semantic matching to Elite and Enterprise tiers only.

---
*Date: 2026-03-18*
*Status: Completed*
