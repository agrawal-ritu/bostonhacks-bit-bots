import React from 'react';

/* 
Shifting background web component. Changes backgrounds by having two layers, one in the foreground and one in the background. The 
foreground is used for transition purposes only. When a colour shift occurs, foreground is set to the new colour and opacity is initially invisible. Then foreground transitions to being visible, providing the animation. 
The foreground is then set invisibile, while the background colour is updated to the new one.

Note that it does not work when it is a React component for some reason. Change to web component prior to usage by doing: window.customElements.define("shifting-background", ShiftingBackground)

Usage:
<shifting-background gradient={gradientColor}></shifting-background>

When one wants to change the gradient, just change gradientColor and the gradient shall shift to that new colour.

gradient property should be in the following format: "direction, colour1, colour2"
- direction specifies which direction the new gradient should be in. For example, "to right", "to bottom", etc
- colour1 and colour2 are the starting and ending colours of the gradient.
A full example is:
<shifting-background gradient={"to right, #00F260, #0575E6"}></shifting-background>

Note that one should not place any children inside of shifting-background. Just include the above tag in the root <div>. 
The component automatically expands to fill the entire screen. 

Made some modifications so that gradient shifts are enqueud so that rapid changes requested by the user are stored and animated gradually.
This means that the animations will be smooth, and will no longer "jump". 
*/
export default class ShiftingBackground extends HTMLElement {
	
	constructor() {
        super();
		// make ShadowRoot accessible from JS, which allows us to attach Shadow DOM
        this.attachShadow({mode:"open"})

		// function that gets called when animation ends.
        this.onTransitionEnd = this.onTransitionEnd.bind(this)
        this.startTransition = this.startTransition.bind(this)
		// function that gets called when the transition is finish setting up for the next animation to play
		this.onTransitionFinish = this.onTransitionFinish.bind(this)

		// get gradient property
        const gradient = this.getAttribute('gradient')
        
		// the length of time each transition takes for new colour to "fade in".
		this.transitionDuration = "opacity 0.75s"
		
		// styling for components
		this.shadowRoot.innerHTML = `
            <style>
                :host {
					position: fixed;
					top: 0;
					left: 0;
					z-index: -1;
                    width: 100%;
					height: 100%;
                    background: linear-gradient(${gradient});
                }
                .foreground {
                    position: fixed;
                    width: 100%;
					height: 100%;
                    background: linear-gradient(${gradient});
                    opacity: 0;
                    transition: ${this.transitionDuration};

                }
            </style>
            <div class="foreground"></div>
        `;
        this.foreground = this.shadowRoot.querySelector(".foreground")
		
		this.transitionQueue = []
		
		this.transitionPlaying = false
		
		this.currentColour = null
    }

	/**
	 * We want to get notified when the user changes the gradient property so we can start the animation. 
	 */
    static get observedAttributes() {
        return ['gradient']
    }

	/**
	 * Gets called whenever a property changes. 
	 */
    attributeChangedCallback(name, oldGradient, newGradient) {
        if (oldGradient === null) {
            // Set initial colour
            window.setTimeout(() => this.startTransition(newGradient))
        } else {
			// start transition if we can
			if (!this.transitionPlaying) {
				this.startTransition(newGradient)
			} else {
				// add to queue so we can play it later
				this.transitionQueue.push(newGradient)
				
				// if the queue is too long, remove the first n-1 elements so that it does not have to "catch up"
				for (let i = 0; i < this.transitionQueue.length - 1; i ++) {
					if (this.transitionQueue.length > 1) {
						this.transitionQueue.shift()
					}
				}
			}
        }
    }

	/**
	 * Starts transition.
	 */
    startTransition(newGradient) {
		this.transitionPlaying = true
        this.foreground.style.background = `linear-gradient(${newGradient})`
		// start transition to make it visible.
        this.foreground.style.opacity = '1'
		// set transition length
		this.foreground.style.transition = `${this.transitionDuration}`
		
		this.currentColour = newGradient
		
		// set listener to notify after transition is done
		this.foreground.addEventListener("transitionend", this.onTransitionEnd)
    }

	/**
	 * Handles when transition animation ends. 
	 */
    onTransitionEnd() {
	
		const newGradient = this.getAttribute("gradient")
        this.style.background = `linear-gradient(${this.currentColour})`
		// set foreground invisible
        this.foreground.style.opacity = '0'
		// make sure that setting the foreground invisible not take too long
		this.foreground.style.transition = `opacity 0.1s ease-in-out`
		
		// remove listener so we dont get notified next time colour changes
        this.foreground.removeEventListener("transitionend", this.onTransitionEnd)
		
		// It takes time to set the foreground invisible again. Wait for that to finish.
		this.foreground.addEventListener("transitionend", this.onTransitionFinish)
		
    }
	
	/**
	 * Handles when foreground is finished resetting and is invisible again. 
	 * Plays the next animation in the queue of any exists.
	*/
	onTransitionFinish() {
		this.transitionPlaying = false

		this.foreground.removeEventListener("transitionend", this.onTransitionFinish)
		
		// play the next transition in the queue if any exists
		if (this.transitionQueue.length > 0) {
			const nextColour = this.transitionQueue.shift()
			this.startTransition(nextColour)
		}
	}
}
