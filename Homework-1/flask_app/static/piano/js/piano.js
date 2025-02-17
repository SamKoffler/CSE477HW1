/**
 * Main function that initializes the piano application.
 * Sets up event listeners for key presses and mouse interactions.
 * Manages the playback of piano sounds and tracks key sequences for the secret feature.
 */
document.addEventListener('DOMContentLoaded', () => {
    const sound = {
        65: "http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav",
        87: "http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav",
        83: "http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav",
        69: "http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav",
        68: "http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav",
        70: "http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav",
        84: "http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav",
        71: "http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav",
        89: "http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav",
        72: "http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav",
        85: "http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav",
        74: "http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav",
        75: "http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav",
        79: "http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav",
        76: "http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav",
        80: "http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav",
        186: "http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav"
    };

    const piano = document.getElementById('piano');
    const keys = piano.querySelectorAll('.white-key, .black-key');
    let playedSequence = '';
    let sequenceTimeout;
    let keydownFunction;


    /**
     * Event listener for mouseover on piano keys.
     * Adds 'hover' class to all keys to reveal their labels.
     */
    keys.forEach(key => {
        key.addEventListener('mouseover', () => {
            keys.forEach(k => k.classList.add('hover'));
        });

        key.addEventListener('mouseout', () => {
            keys.forEach(k => k.classList.remove('hover'));
        });
    });

    /**
     * Handles keydown events for playing piano notes.
     * Plays corresponding sound, tracks key sequences, and manages visual feedback.
     * Checks for the secret 'weseeyou' sequence to trigger special effect.
     */
    keydownFunction = (event) => {
        const key = document.querySelector(`[data-key="${event.key.toUpperCase()}"]`);
        if (key) {
            key.classList.add('active');
            
            // Play sound corresponding to the key
            if (sound[event.keyCode]) {
                new Audio(sound[event.keyCode]).play();
            }

            // Track the sequence of keys pressed
            playedSequence += event.key.toLowerCase();

            // Clear previous timeout for sequence reset
            clearTimeout(sequenceTimeout);
            
            // Limit sequence to last 9 characters to prevent excessive memory use
            if (playedSequence.length > 8) {
                playedSequence = playedSequence.slice(-8);
            }

            // Check if the exact secret sequence has been typed
            if (playedSequence === 'weseeyou') {
                // Ensure the awakening happens after current event processing
                setTimeout(() => {
                    awakeGreatOldOne();
                }, 0);
            }

            // Remove active styling from key after a short delay
            setTimeout(() => {
                key.classList.remove('active');
            }, 100);

            // Reset sequence if no key is pressed for 2 seconds
            sequenceTimeout = setTimeout(() => {
                playedSequence = '';
            }, 2000);
        }
    };

    document.addEventListener('keydown', keydownFunction);

    /**
     * Activates the "Great Old One" special effect.
     * Fades out the piano, plays creepy audio, and reveals a hidden image and text.
     * Removes the keydown event listener to disable further piano interaction.
     */
    function awakeGreatOldOne() {
        const pianoContainer = document.getElementById('piano-container');
        const piano = document.getElementById('piano');
        
        if (!pianoContainer || !piano) {
            return;
        }
    
        // Play creepy audio
        const creepyAudio = new Audio('../static/piano/audio/Creepy-piano-sound-effect.mp3');
        creepyAudio.play();
    
        // Fade out piano
        piano.style.transition = 'opacity 1s';
        piano.style.opacity = '0';
    
        // Create image element to reveal
        const revealImage = document.createElement('img');
        revealImage.src = '../static/piano/images/texture.jpeg';
        revealImage.classList.add('reveal-image');
    
        // Create text element
        const awokenText = document.createElement('div');
        awokenText.textContent = "I have awoken.";
        awokenText.classList.add('awoken-text');
        
        // Append elements to container
        pianoContainer.appendChild(revealImage);
        pianoContainer.appendChild(awokenText);
    
        // Fade in image and text
        requestAnimationFrame(() => {
            setTimeout(() => {
                revealImage.style.opacity = '1';
                awokenText.style.opacity = '1';
            }, 50);
        });
    
        // Remove key press event listener to stop playing notes
        document.removeEventListener('keydown', keydownFunction);
    }
});