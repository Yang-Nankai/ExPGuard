// Custom logging function
let isLoggingEnabled = false;
function log(...args) {
    if (isLoggingEnabled) {
        console.log('[WMX] ', ...args);
    }
}

// State management
let overlay = null;
let isOverlayVisible = false;
let styleSheet = null;
let detectedFonts = { webFonts: [], systemFonts: [] };
let currentFontSize = 32;
let currentLetterSpacing = 0; // Initial letter spacing value
let originalFontSize;
let originalLetterSpacing;
let hasZoomedPreview = false;
let originalSliderMin;
let originalSliderMax;
let currentSampleText = 'Your Text Here'; // Add variable to track the current sample text

// Function to detect fonts on the page
function detectFonts() {
    log('Detecting fonts on page...');
    const elements = document.getElementsByTagName('*');
    const allFonts = new Map(); // Changed to Map to store font details
    
    // Get all fonts from elements
    for (const element of elements) {
        // Skip elements that are part of our overlay
        if (element.closest('.wm-overlay')) {
            continue;
        }
        
        const computedStyle = window.getComputedStyle(element);
        const fontFamily = computedStyle.fontFamily;
        const fontWeight = computedStyle.fontWeight;
        const fontStyle = computedStyle.fontStyle;
        
        // Split font family string and clean up
        const fontNames = fontFamily
            .split(',')
            .map(font => font.trim().replace(/['"]/g, ''))
            .filter(font => font !== 'inherit' && font !== 'initial');
        
        fontNames.forEach(font => {
            if (!allFonts.has(font)) {
                allFonts.set(font, {
                    name: font,
                    weights: new Set(),
                    styles: new Set()
                });
            }
            const fontDetails = allFonts.get(font);
            fontDetails.weights.add(fontWeight);
            fontDetails.styles.add(fontStyle);
        });
    }

    // Get all loaded web fonts using document.fonts
    const webFonts = [];
    const systemFonts = [];
    
    // Check which fonts are web fonts (loaded through @font-face)
    if (document.fonts && document.fonts.forEach) {
        const loadedWebFonts = new Set();
        
        // Get all loaded web fonts
        document.fonts.forEach(font => {
            if (font.status === 'loaded') {
                const fontFamilyName = font.family.replace(/['"]/g, '');
                loadedWebFonts.add(fontFamilyName);
            }
        });
        
        // Categorize fonts as web or system
        allFonts.forEach((fontDetails, fontName) => {
            if (loadedWebFonts.has(fontName)) {
                webFonts.push({
                    name: fontName,
                    weights: Array.from(fontDetails.weights),
                    styles: Array.from(fontDetails.styles)
                });
            } else {
                systemFonts.push({
                    name: fontName,
                    weights: Array.from(fontDetails.weights),
                    styles: Array.from(fontDetails.styles)
                });
            }
        });
    } else {
        // Fallback if document.fonts is not available
        log('document.fonts API not available, cannot reliably detect web fonts');
        allFonts.forEach((fontDetails, fontName) => {
            systemFonts.push({
                name: fontName,
                weights: Array.from(fontDetails.weights),
                styles: Array.from(fontDetails.styles)
            });
        });
    }
    
    // Sort the font arrays alphabetically
    webFonts.sort((a, b) => a.name.localeCompare(b.name));
    systemFonts.sort((a, b) => a.name.localeCompare(b.name));
    
    log('Detected web fonts:', webFonts);
    log('Detected system fonts:', systemFonts);
    
    // Send the web font count to the background script to update the badge
    chrome.runtime.sendMessage({ 
        action: 'updateWebFontCount', 
        count: webFonts.length 
    });
    
    return {
        webFonts,
        systemFonts
    };
}

// Function to create a font preview element
function createFontPreview(fontName, text, isSystemFont = false, weight = 'normal', style = 'normal') {
    log('Creating preview for font:', fontName);
    const preview = document.createElement('div');
    preview.className = 'wm-font-preview';
    
    // Create sample text element
    const sample = document.createElement('div');
    sample.className = 'wm-font-sample';
    sample.textContent = text || currentSampleText;
    sample.style.fontFamily = fontName;
    sample.style.fontSize = `${currentFontSize}px`;
    sample.style.fontWeight = weight;
    sample.style.fontStyle = style;
    sample.style.letterSpacing = `${currentLetterSpacing}px`;
    
    // Create name element with style information
    const name = document.createElement('div');
    name.className = 'wm-font-name';
    
    // Format the weight and style for display
    const weightText = weight === 'normal' ? '' : weight;
    const styleText = style === 'normal' ? '' : style;
    const styleInfo = [weightText, styleText].filter(Boolean).join(' ');
    
    name.textContent = `${fontName}${styleInfo ? ` ${styleInfo}` : ''}`;
    
    // Add system font indicator if applicable
    if (isSystemFont) {
        const systemIndicator = document.createElement('span');
        systemIndicator.className = 'wm-system-font-indicator';
        
        // Create a span to hold the "S" text
        const sText = document.createElement('span');
        sText.textContent = 'S';
        
        systemIndicator.appendChild(sText);
        name.appendChild(systemIndicator);
    }

    const closeButton = document.createElement('button');
    closeButton.className = 'wm-zoomed-preview-close';
    closeButton.innerHTML = 'Close <span>⇲</span>';
    closeButton.title = 'Close preview';
    
    preview.appendChild(sample);
    preview.appendChild(name);
    preview.appendChild(closeButton);
    
    // Make sample editable on click
    sample.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering zoom
        
        // Make this element editable and mark it as being edited
        sample.contentEditable = 'true';
        sample.setAttribute('data-editing', 'true');
        sample.focus();
    });
    
    // Update text input when sample is edited
    sample.addEventListener('input', (e) => {
        const newText = sample.textContent;
        
        // Update current sample text variable to persist changes
        currentSampleText = newText;
        
        // Update all other samples directly
        updateAllSamplesExcept(sample, newText);
    });
    
    // Stop editing when focus is lost
    sample.addEventListener('blur', () => {
        sample.contentEditable = 'false';
        sample.removeAttribute('data-editing');
        sample.setAttribute('data-just-edited', 'true');
    });
    
    // Modify the zoom click handler to toggle the header save button
    preview.addEventListener('click', (e) => {
        // Don't zoom if clicking the close button or the sample
        if (e.target.closest('.wm-zoomed-preview-close, .wm-font-sample')) {
            return;
        }

        // Don't zoom if this preview was just edited
        if (preview.querySelector('.wm-font-sample[data-just-edited="true"]')) {
            // remove the data-just-edited attribute
            preview.querySelector('.wm-font-sample[data-just-edited="true"]').removeAttribute('data-just-edited');
            return;
        }
        
        const isZoomed = preview.classList.contains('zoomed');
        if (isZoomed) {
            preview.classList.remove('zoomed');
            hasZoomedPreview = false;
            
            // Hide the header save button
            const headerSaveButton = overlay.querySelector('.wm-header-save-button');
            if (headerSaveButton) {
                headerSaveButton.style.display = 'none';
            }
            
            // Hide the export content
            const exportContent = overlay.querySelector('.wm-export-panel');
            const exportOptions = overlay.querySelector('.wm-export-options');
            if (exportContent) {
                // First add the hidden class to options so it animates out
                if (exportOptions) {
                    exportOptions.classList.add('hidden');
                }
                
                // Wait for the transition to complete before hiding the content
                setTimeout(() => {
                    exportContent.classList.remove('active');
                }, 300); // Match this with your transition duration
            }
            
            // Restore original font size and spacing
            currentFontSize = originalFontSize;
            currentLetterSpacing = originalLetterSpacing;
            
            // Update sliders to match original values
            const sizeSlider = overlay.querySelector('.wm-size-slider');
            if (sizeSlider) {
                sizeSlider.value = originalFontSize;
                // Restore original min/max values
                sizeSlider.min = originalSliderMin;
                sizeSlider.max = originalSliderMax;
            }
            
            const spacingSlider = overlay.querySelector('.wm-spacing-slider');
            if (spacingSlider) spacingSlider.value = originalLetterSpacing;
            
            // Update all previews with original values but keep the current sample text
            updateFontPreviews(currentSampleText);
        } else {
            // Remove zoom from any other previews
            document.querySelectorAll('.wm-font-preview.zoomed').forEach(p => {
                p.classList.remove('zoomed');
            });
            
            // Save current values before zooming
            originalFontSize = currentFontSize;
            originalLetterSpacing = currentLetterSpacing;
            hasZoomedPreview = true;
            
            // Set a larger font size for the zoomed preview
            const zoomedFontSize = Math.min(96, originalFontSize * 3);
            currentFontSize = zoomedFontSize;
            
            // Update the size slider to match
            const sizeSlider = overlay.querySelector('.wm-size-slider');
            if (sizeSlider) {
                // Save original min/max values
                originalSliderMin = sizeSlider.min;
                originalSliderMax = sizeSlider.max;
                
                // Set new min/max values for zoomed view
                sizeSlider.min = 16;
                sizeSlider.max = 192;
                
                sizeSlider.value = currentFontSize;
                // Update size value display if it exists
                const sizeValue = overlay.querySelector('.wm-size-value');
                if (sizeValue) {
                    sizeValue.textContent = `${currentFontSize}px`;
                }
            }
            
            preview.classList.add('zoomed');
            
            // Update the sample font size
            const sample = preview.querySelector('.wm-font-sample');
            if (sample) {
                sample.style.fontSize = `${currentFontSize}px`;
            }
            
            // Show the header save button
            const headerSaveButton = overlay.querySelector('.wm-header-save-button');
            if (headerSaveButton) {
                headerSaveButton.style.display = 'inline-flex';
                headerSaveButton.setAttribute('data-font-name', fontName);
            }
        }
    });

    // Update the close button handler to also hide the header save button
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        preview.classList.remove('zoomed');
        hasZoomedPreview = false;
        
        // Hide the header save button
        const headerSaveButton = overlay.querySelector('.wm-header-save-button');
        if (headerSaveButton) {
            headerSaveButton.style.display = 'none';
        }
        
        // Hide the export content
        const exportContent = overlay.querySelector('.wm-export-panel');
        const exportOptions = overlay.querySelector('.wm-export-options');
        if (exportContent) {
            // First add the hidden class to options so it animates out
            if (exportOptions) {
                exportOptions.classList.add('hidden');
            }
            
            // Wait for the transition to complete before hiding the content
            setTimeout(() => {
                exportContent.classList.remove('active');
            }, 300); // Match this with your transition duration
        }
        
        // Restore original font size and spacing
        currentFontSize = originalFontSize;
        currentLetterSpacing = originalLetterSpacing;
        
        // Update sliders to match original values
        const sizeSlider = overlay.querySelector('.wm-size-slider');
        if (sizeSlider) {
            sizeSlider.value = originalFontSize;
            // Restore original min/max values
            sizeSlider.min = originalSliderMin;
            sizeSlider.max = originalSliderMax;
        }
        
        const spacingSlider = overlay.querySelector('.wm-spacing-slider');
        if (spacingSlider) spacingSlider.value = originalLetterSpacing;
        
        // Update all previews with original values but keep the current sample text
        updateFontPreviews(currentSampleText);
    });
    
    return preview;
}

// Helper function to update all samples except the one being edited
function updateAllSamplesExcept(excludeSample, text) {
    // Update the current sample text when it changes
    currentSampleText = text;
    
    document.querySelectorAll('.wm-font-sample').forEach(sample => {
        if (sample !== excludeSample) {
            sample.textContent = text;
        }
    });
}

// Update font previews with new text
function updateFontPreviews(text) {
    log('Updating previews with text:', text);
    
    // If text is provided, update the current sample text
    if (text) {
        currentSampleText = text;
    } else {
        // Use the stored sample text if no text is provided
        text = currentSampleText;
    }
    
    // Check if there's an element being edited
    const currentlyEditing = overlay.querySelector('.wm-font-sample[data-editing="true"]');
    
    // If updating from the text input while an element is being edited,
    // just update all other elements except the one being edited
    if (currentlyEditing) {
        updateAllSamplesExcept(currentlyEditing, text);
        return;
    }
    
    // Otherwise, perform a full rebuild
    const grid = overlay.querySelector('.wm-font-grid');
    
    // Update the intro text with current font counts
    const introText = grid.querySelector('.wm-font-intro');
    if (introText) {
        introText.textContent = `Wordmark found ${detectedFonts.webFonts.length} web fonts and ${detectedFonts.systemFonts.length} system fonts used in this website`;
    }
    
    // Clear existing previews (but keep the intro text)
    const previews = grid.querySelectorAll('.wm-font-preview');
    previews.forEach(preview => preview.remove());
    
    // Add web fonts first
    detectedFonts.webFonts.forEach(font => {
        // Create previews for each weight and style combination
        font.weights.forEach(weight => {
            font.styles.forEach(style => {
                const preview = createFontPreview(font.name, text, false, weight, style);
                grid.appendChild(preview);
            });
        });
    });
    
    // Then add system fonts
    detectedFonts.systemFonts.forEach(font => {
        // Create previews for each weight and style combination
        font.weights.forEach(weight => {
            font.styles.forEach(style => {
                const preview = createFontPreview(font.name, text, true, weight, style);
                grid.appendChild(preview);
            });
        });
    });
    
    // Update letter spacing and font size for all samples
    document.querySelectorAll('.wm-font-sample').forEach(sample => {
        sample.style.fontSize = `${currentFontSize}px`;
        sample.style.letterSpacing = `${currentLetterSpacing}px`;
    });
}

// Function to save preview as image
function savePreviewAsImage(previewElement, fontName) {
    log('Saving preview as image...');
    
    // Get the canvas from the export preview
    const canvas = overlay.querySelector('.wm-export-preview canvas');
    
    // Convert canvas to data URL and trigger download
    try {
        const dataUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        const sanitizedFontName = fontName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        
        downloadLink.href = dataUrl;
        downloadLink.download = `wordmark_${sanitizedFontName}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        log('Preview image saved successfully');
    } catch (error) {
        log('Error saving preview image:', error);
    }
}

// Function to generate canvas preview and display it
function generateCanvasPreview(previewElement) {
    log('Generating canvas preview...');
    
    // Get the export preview container
    const exportPreviewContainer = overlay.querySelector('.wm-export-preview');
    
    // Clear any existing content
    exportPreviewContainer.innerHTML = '';
    
    // Check export options
    const isHighResolution = overlay.querySelector('.wm-export-resolution-button.active').textContent.trim() === 'High';
    const hideBackground = overlay.querySelector('#wm-export-hide-background').checked;
    const includeFontName = overlay.querySelector('#wm-export-include-font-name').checked;
    const includeWebsiteName = overlay.querySelector('#wm-export-include-website-name').checked;
    
    // Create a clone of the preview to avoid modifying the original
    const clonedPreview = previewElement.cloneNode(true);
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(clonedPreview);
    document.body.appendChild(tempContainer);
    
    // Style the cloned preview for image capture
    clonedPreview.style.position = 'absolute';
    clonedPreview.style.left = '-9999px';
    clonedPreview.style.zIndex = '-1';
    
    // Remove buttons from the clone
    const closeBtn = clonedPreview.querySelector('.wm-zoomed-preview-close');
    if (closeBtn) closeBtn.remove();
    
    // For this implementation, we're using a direct canvas approach
    const canvas = document.createElement('canvas');
    
    // Get computed styles to determine the actual border width
    const previewStyle = window.getComputedStyle(previewElement);
    const borderWidth = parseInt(previewStyle.borderWidth) || 0; // Default to 0px if not specified
    
    // Set canvas dimensions based on preview content and resolution setting
    const scaleFactor = isHighResolution ? 2 : 1;
    // Only subtract the border width, not an arbitrary padding
    canvas.width = (previewElement.offsetWidth - (borderWidth * 2)) * scaleFactor;
    canvas.height = (previewElement.offsetHeight - (borderWidth * 2)) * scaleFactor;
    
    const ctx = canvas.getContext('2d');
    
    // Fill background if not hidden
    if (!hideBackground) {
        ctx.fillStyle = getComputedStyle(previewElement).backgroundColor || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Get font sample and name elements
    const fontSample = clonedPreview.querySelector('.wm-font-sample');
    const fontNameEl = clonedPreview.querySelector('.wm-font-name');
    const websiteUrl = window.location.hostname; // Get the current website's hostname
    
    if (fontSample && fontNameEl) {
        // Scale everything based on resolution setting
        const leftPadding = 40 * scaleFactor; 
        
        // Draw the font sample text (left-aligned as in the original)
        const fontSize = parseInt(getComputedStyle(fontSample).fontSize) * scaleFactor;
        ctx.font = `${getComputedStyle(fontSample).fontWeight} ${fontSize}px ${getComputedStyle(fontSample).fontFamily}`;
        ctx.fillStyle = getComputedStyle(fontSample).color || '#000000';
        ctx.textAlign = 'left'; 
        ctx.textBaseline = 'middle'; 
        const verticalCenter = canvas.height / 2; 
        ctx.fillText(fontSample.textContent, leftPadding, verticalCenter);

        // Draw the font name and website at the bottom if options are selected
        if (includeFontName || includeWebsiteName) {
            const nameFontSize = parseInt(getComputedStyle(fontNameEl).fontSize) * scaleFactor;
            const bottomPadding = 25 * scaleFactor;
            let xPosition = leftPadding;
            
            if (includeFontName) {
                ctx.font = `${nameFontSize}px sans-serif`;
                ctx.fillStyle = getComputedStyle(fontNameEl).color || '#666666';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                const fontNameText = fontNameEl.textContent;
                ctx.fillText(fontNameText, xPosition, canvas.height - bottomPadding);
                xPosition += ctx.measureText(fontNameText).width;
            }
            
            if (includeWebsiteName && websiteUrl) {
                if (includeFontName) {
                    // Add connecting text only if both options are selected
                    const savedFromText = ' from ';
                    ctx.font = `italic ${nameFontSize}px sans-serif`;
                    ctx.fillStyle = '#999999';
                    ctx.fillText(savedFromText, xPosition, canvas.height - bottomPadding);
                    xPosition += ctx.measureText(savedFromText).width;
                }
                
                ctx.font = `${nameFontSize}px sans-serif`;
                ctx.fillStyle = getComputedStyle(fontNameEl).color || '#666666';
                ctx.fillText(websiteUrl, xPosition, canvas.height - bottomPadding);
            }
        }
    }
    
    // Add canvas to the export preview container
    exportPreviewContainer.appendChild(canvas);
    
    // Clean up the temporary elements
    document.body.removeChild(tempContainer);
    
    return canvas;
}

// Function to load the overlay CSS
async function loadStylesheet() {
    if (styleSheet) return; // Don't load it twice
    
    try {
        const cssURL = chrome.runtime.getURL('styles/overlay.css');
        const response = await fetch(cssURL);
        if (!response.ok) {
            throw new Error(`Failed to load CSS: ${response.status}`);
        }
        const css = await response.text();
        
        // Create a style element and inject it into the document
        styleSheet = document.createElement('style');
        styleSheet.id = 'wm-overlay-styles';
        styleSheet.textContent = css;
        document.head.appendChild(styleSheet);
        
        log('CSS loaded successfully');
    } catch (error) {
        log('Error loading CSS:', error);
    }
}

// Function to remove the overlay CSS when not needed
function removeStylesheet() {
    if (styleSheet) {
        styleSheet.remove();
        styleSheet = null;
        log('CSS removed');
    }
}

// Function to create and inject the overlay
async function createOverlay() {
    try {
        // Load stylesheet first
        await loadStylesheet();
        
        // Load overlay template
        const templateURL = chrome.runtime.getURL('templates/overlay.html');
        const response = await fetch(templateURL);
        if (!response.ok) {
            throw new Error(`Failed to load overlay template: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Create temporary div to parse the HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Extract the overlay element
        overlay = temp.querySelector('.wm-overlay');
        
        if (!overlay) {
            throw new Error('Could not find .wm-overlay element in template');
        }
        
        // Add the overlay to the document
        document.body.appendChild(overlay);
        
        // Set up event listeners and initialize the overlay
        setupOverlayEvents();
        
        // Make overlay visible
        overlay.style.display = 'flex';
        isOverlayVisible = true;
        
        // Detect fonts and update previews
        detectedFonts = detectFonts();
        updateFontPreviews(currentSampleText);
        
        return true;
    } catch (error) {
        log('Error creating overlay:', error);
        return false;
    }
}

// Function to completely remove the overlay from the DOM
function removeOverlay() {
    if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
        overlay = null;
    }
    
    removeStylesheet();
    isOverlayVisible = false;
}

// Initialize the overlay (legacy function, now just creates the overlay)
async function initializeOverlay() {
    return await createOverlay();
}

// Toggle overlay visibility
async function toggleOverlay() {
    log('Toggling overlay...');
    
    if (isOverlayVisible) {
        // Remove the overlay completely
        removeOverlay();
    } else {
        // Create the overlay if it doesn't exist
        if (!overlay) {
            const success = await createOverlay();
            if (!success) {
                log('Failed to create overlay');
                return;
            }
        } else {
            // If overlay exists but is hidden, make it visible
            await loadStylesheet();
            overlay.style.display = 'flex';
            isOverlayVisible = true;
            
            // Refresh font detection
            detectedFonts = detectFonts();
            updateFontPreviews(currentSampleText);
        }
    }
}

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleOverlay') {
        toggleOverlay();
        sendResponse({ success: true });
        return true;
    } else if (message.action === 'getPageFontCount') {
        // If fonts haven't been detected yet, detect them now
        if (!detectedFonts.webFonts.length) {
            detectedFonts = detectFonts();
        }
        
        // Return the count of web fonts on the page
        sendResponse({ fontCount: detectedFonts.webFonts.length });
        return true;
    }
    return false;
});

// Initialize when the page loads
log('Content script loaded');

// Detect fonts after page is fully loaded
window.addEventListener('load', () => {
    // Detect fonts initially when the page loads
    setTimeout(() => {
        detectedFonts = detectFonts();
    }, 500); // Small delay to ensure fonts are loaded
});

// Setup event listeners for the overlay
function setupOverlayEvents() {
    log('Setting up event listeners...');

    // Close button
    const closeButton = overlay.querySelector('.wm-overlay-close-button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            log('Close button clicked');
            toggleOverlay();
        });
    }
    
    // Info button
    const infoButton = overlay.querySelector('.wm-info-button');
    const infoPage = overlay.querySelector('.wm-info-page');
    const fontGrid = overlay.querySelector('.wm-font-grid');
    
    if (infoButton && infoPage && fontGrid) {
        infoButton.addEventListener('click', () => {
            log('Info button clicked');
            const isInfoPageVisible = infoPage.classList.contains('active');
            infoPage.classList.toggle('active');
            fontGrid.style.display = isInfoPageVisible ? 'flex' : 'none';
            infoButton.textContent = isInfoPageVisible ? 'Information' : 'Back to Fonts';
            infoButton.classList.toggle('active', !isInfoPageVisible);
        });
    }
    
    // Text input
    const textInput = overlay.querySelector('.wm-text-input');
    if (textInput) {
        textInput.addEventListener('input', (e) => {
            log('Text input changed:', e.target.value);
            currentSampleText = e.target.value; // Update the current sample text
            updateFontPreviews(e.target.value);
        });
    }

    // Font size slider
    const sizeSlider = overlay.querySelector('.wm-size-slider');
    const sizeValue = overlay.querySelector('.wm-size-value');
    
    if (sizeSlider) {
        // Store original values
        originalFontSize = currentFontSize;
        originalSliderMin = sizeSlider.min;
        originalSliderMax = sizeSlider.max;
        
        sizeSlider.addEventListener('input', (e) => {
            currentFontSize = parseInt(e.target.value);
            if (sizeValue) {
                sizeValue.textContent = `${currentFontSize}px`;
            }
            
            // Only update the zoomed preview if one exists
            if (hasZoomedPreview) {
                const zoomedPreview = overlay.querySelector('.wm-font-preview.zoomed');
                if (zoomedPreview) {
                    const sample = zoomedPreview.querySelector('.wm-font-sample');
                    if (sample) {
                        sample.style.fontSize = `${currentFontSize}px`;
                    }
                }
            } else {
                // Use the stored sample text
                updateFontPreviews(currentSampleText);
            }
        });
    }
    
    // Letter spacing slider
    const spacingSlider = overlay.querySelector('.wm-spacing-slider');
    const spacingLabel = overlay.querySelector('.wm-spacing-control label');
    
    if (spacingSlider) {
        // Store original value
        originalLetterSpacing = currentLetterSpacing;
        
        spacingSlider.addEventListener('input', (e) => {
            currentLetterSpacing = parseFloat(e.target.value);
            
            // Only update the zoomed preview if one exists
            if (hasZoomedPreview) {
                const zoomedPreview = overlay.querySelector('.wm-font-preview.zoomed');
                if (zoomedPreview) {
                    const sample = zoomedPreview.querySelector('.wm-font-sample');
                    if (sample) {
                        sample.style.letterSpacing = `${currentLetterSpacing}px`;
                    }
                }
                
                // Update spacing label class based on current value
                if (spacingLabel) {
                    if (currentLetterSpacing !== 0) {
                        spacingLabel.classList.add('can-reset');
                    } else {
                        spacingLabel.classList.remove('can-reset');
                    }
                }
            } else {
                // Use the stored sample text
                updateFontPreviews(currentSampleText);
                
                // Update spacing label class based on current value
                if (spacingLabel) {
                    if (currentLetterSpacing !== 0) {
                        spacingLabel.classList.add('can-reset');
                    } else {
                        spacingLabel.classList.remove('can-reset');
                    }
                }
            }
        });
    }
    
    // Set up other event handlers as needed
    setupExportEvents();
}

// Setup export-related event listeners
function setupExportEvents() {
    // Header save button
    const headerSaveButton = overlay.querySelector('.wm-header-save-button');
    if (headerSaveButton) {
        headerSaveButton.addEventListener('click', () => {
            const zoomedPreview = overlay.querySelector('.wm-font-preview.zoomed');
            if (zoomedPreview) {
                // Show the export content instead of saving directly
                const exportContent = overlay.querySelector('.wm-export-panel');
                const exportOptions = overlay.querySelector('.wm-export-options');
                if (exportContent) {
                    exportContent.classList.add('active');
                    
                    // Use requestAnimationFrame to ensure the display change is rendered first
                    requestAnimationFrame(() => {
                        if (exportOptions) {
                            exportOptions.classList.remove('hidden');
                        }
                    });
                    
                    // Generate and display the canvas preview
                    generateCanvasPreview(zoomedPreview);
                }
            }
        });
    }
    
    // Export cancel button
    const exportCancelButton = overlay.querySelector('.wm-export-cancel-button');
    if (exportCancelButton) {
        exportCancelButton.addEventListener('click', () => {
            const exportContent = overlay.querySelector('.wm-export-panel');
            const exportOptions = overlay.querySelector('.wm-export-options');
            if (exportContent) {
                // First add the hidden class to options so it animates out
                if (exportOptions) {
                    exportOptions.classList.add('hidden');
                }
                
                // Wait for the transition to complete before hiding the content
                setTimeout(() => {
                    exportContent.classList.remove('active');
                }, 190); // Match this with your transition duration
            }
        });
    }
    
    // Export download button
    const exportDownloadButton = overlay.querySelector('.wm-export-download-button');
    if (exportDownloadButton) {
        exportDownloadButton.addEventListener('click', () => {
            const zoomedPreview = overlay.querySelector('.wm-font-preview.zoomed');
            if (zoomedPreview) {
                const fontName = headerSaveButton ? headerSaveButton.getAttribute('data-font-name') : 'font-preview';
                savePreviewAsImage(zoomedPreview, fontName);
                
                // Hide the export content after saving
                const exportContent = overlay.querySelector('.wm-export-panel');
                const exportOptions = overlay.querySelector('.wm-export-options');
                if (exportContent) {
                    // First add the hidden class to options so it animates out
                    if (exportOptions) {
                        exportOptions.classList.add('hidden');
                    }
                    
                    // Wait for the transition to complete before hiding the content
                    setTimeout(() => {
                        exportContent.classList.remove('active');
                    }, 300); // Match this with your transition duration
                }
            }
        });
    }
    
    // Export resolution buttons
    const resolutionButtons = overlay.querySelectorAll('.wm-export-resolution-button');
    if (resolutionButtons.length) {
        resolutionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                resolutionButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Regenerate the preview with the new resolution
                const zoomedPreview = overlay.querySelector('.wm-font-preview.zoomed');
                if (zoomedPreview) {
                    generateCanvasPreview(zoomedPreview);
                }
            });
        });
    }
    
    // Export option checkboxes
    const exportOptionCheckboxes = overlay.querySelectorAll('.wm-export-option-checkbox');
    if (exportOptionCheckboxes.length) {
        exportOptionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Regenerate the preview when options change
                const zoomedPreview = overlay.querySelector('.wm-font-preview.zoomed');
                if (zoomedPreview) {
                    generateCanvasPreview(zoomedPreview);
                }
            });
        });
    }
} 