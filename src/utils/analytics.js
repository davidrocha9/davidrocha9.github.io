// Google Analytics 4 utility functions

// Generate a unique session ID
const getSessionId = () => {
  if (typeof window === 'undefined') return 'unknown';
  if (!window.__portfolioSessionId) {
    window.__portfolioSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  return window.__portfolioSessionId;
};

// Get user's timezone (helps infer country/region)
const getUserTimezone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'unknown';
  }
};

// Get user's language preferences
const getUserLanguages = () => {
  if (typeof navigator === 'undefined') return 'unknown';
  return navigator.languages ? navigator.languages.join(',') : navigator.language || 'unknown';
};

/**
 * Track a custom event to Google Analytics 4
 * @param {string} eventName - The event name (e.g., 'window_open', 'icon_click')
 * @param {Object} params - Event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      session_id: getSessionId(),
      timezone: getUserTimezone(),
      user_languages: getUserLanguages(),
    });
  }
};

/**
 * Track page access with enhanced user data
 * @param {string} pagePath - The page path/URL
 * @param {string} pageTitle - Page title
 * @param {Object} extraParams - Additional parameters
 */
export const trackPageAccess = (pagePath = window.location.pathname, pageTitle = document.title, extraParams = {}) => {
  trackEvent('page_access', {
    page_path: pagePath,
    page_title: pageTitle,
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'direct',
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    ...extraParams,
  });
};

/**
 * Track window opens
 * @param {string} windowType - Type of window (e.g., 'pdf', 'browser', 'folder')
 * @param {string} windowLabel - Label/title of the window
 * @param {string} windowId - Unique identifier for the window
 * @param {Object} extraParams - Additional parameters
 */
export const trackWindowOpen = (windowType, windowLabel, windowId, extraParams = {}) => {
  const eventName = windowType === 'folder' ? 'folder_access' : 'window_open';
  trackEvent(eventName, {
    window_type: windowType,
    window_label: windowLabel,
    window_id: windowId,
    ...extraParams,
  });
};

/**
 * Track folder access specifically
 * @param {string} folderName - Name of the folder opened
 * @param {string} folderId - Unique identifier for the folder
 * @param {number} fileCount - Number of files in the folder
 * @param {Array} fileTypes - Types of files available in the folder
 */
export const trackFolderAccess = (folderName, folderId, fileCount, fileTypes = []) => {
  trackEvent('folder_access', {
    folder_name: folderName,
    folder_id: folderId,
    file_count: fileCount,
    file_types: fileTypes.join(','),
  });
};

/**
 * Track window closes
 * @param {string} windowType - Type of window
 * @param {string} windowLabel - Label/title of the window
 * @param {string} windowId - Unique identifier for the window
 * @param {number} durationMs - How long the window was open (optional)
 */
export const trackWindowClose = (windowType, windowLabel, windowId, durationMs) => {
  trackEvent('window_close', {
    window_type: windowType,
    window_label: windowLabel,
    window_id: windowId,
    duration_ms: durationMs,
  });
};

/**
 * Track desktop icon interactions
 * @param {string} action - The action performed ('click' or 'double_click')
 * @param {string} iconLabel - Label of the icon
 * @param {string} iconType - Type of the icon
 * @param {string} iconId - Unique identifier for the icon
 */
export const trackIconInteraction = (action, iconLabel, iconType, iconId) => {
  trackEvent('icon_interaction', {
    action: action,
    icon_label: iconLabel,
    icon_type: iconType,
    icon_id: iconId,
  });
};

/**
 * Track folder file opens with detailed hierarchy
 * @param {string} folderName - Name of the parent folder
 * @param {string} fileLabel - Label of the file clicked
 * @param {string} fileType - Type of the file
 * @param {string} fileId - Unique identifier for the file
 * @param {Object} extraParams - Additional file metadata
 */
export const trackFolderFileOpen = (folderName, fileLabel, fileType, fileId, extraParams = {}) => {
  trackEvent('folder_file_open', {
    folder_name: folderName,
    file_label: fileLabel,
    file_type: fileType,
    file_id: fileId,
    folder_file_path: `${folderName} > ${fileLabel}`,
    interaction_type: 'file_open',
    ...extraParams,
  });
};

/**
 * Track external link clicks
 * @param {string} linkType - Type of link (e.g., 'linkedin', 'github', 'mail', 'project')
 * @param {string} url - The URL being opened
 * @param {string} label - Label/description of the link
 */
export const trackExternalLink = (linkType, url, label) => {
  trackEvent('external_link_click', {
    link_type: linkType,
    url: url,
    label: label,
  });
};

/**
 * Track hobbies section interactions
 * @param {string} hobbyType - Type of hobby (e.g., 'spotify', 'discogs', 'chess', 'games', 'letterboxd')
 * @param {string} action - The action performed
 * @param {Object} extraParams - Additional parameters
 */
export const trackHobbyInteraction = (hobbyType, action, extraParams = {}) => {
  trackEvent('hobby_interaction', {
    hobby_type: hobbyType,
    action: action,
    ...extraParams,
  });
};

/**
 * Track tab switches in multi-tab windows
 * @param {string} windowType - Type of window (e.g., 'github', 'chess')
 * @param {string} tabName - Name of the tab switched to
 * @param {string} previousTab - Name of the previous tab (optional)
 */
export const trackTabSwitch = (windowType, tabName, previousTab) => {
  trackEvent('tab_switch', {
    window_type: windowType,
    tab_name: tabName,
    previous_tab: previousTab,
  });
};

/**
 * Track browser navigation actions
 * @param {string} action - The navigation action (e.g., 'go', 'back', 'forward', 'refresh')
 * @param {string} url - The URL being navigated to
 * @param {string} title - Title of the page
 */
export const trackBrowserNavigation = (action, url, title) => {
  trackEvent('browser_navigation', {
    action: action,
    url: url,
    page_title: title,
  });
};

/**
 * Track document/PDF viewer interactions
 * @param {string} action - The action performed (e.g., 'open', 'page_change', 'download')
 * @param {string} documentName - Name of the document
 * @param {string} documentType - Type of document (e.g., 'pdf', 'markdown')
 * @param {number} pageNumber - Current page number (optional)
 */
export const trackDocumentInteraction = (action, documentName, documentType, pageNumber) => {
  trackEvent('document_interaction', {
    action: action,
    document_name: documentName,
    document_type: documentType,
    page_number: pageNumber,
  });
};

/**
 * Track session summary - which folders/files were accessed in a session
 * @param {Array} accessedFolders - List of folder names accessed
 * @param {Array} openedFiles - List of files opened with format {folder: string, file: string}
 * @param {number} sessionDurationMs - Duration of the session
 */
export const trackSessionSummary = (accessedFolders = [], openedFiles = [], sessionDurationMs) => {
  trackEvent('session_summary', {
    accessed_folders: accessedFolders.join(','),
    opened_files_count: openedFiles.length,
    opened_files_list: openedFiles.map(f => `${f.folder} > ${f.file}`).join(';'),
    session_duration_ms: sessionDurationMs,
  });
};
