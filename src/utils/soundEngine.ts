/**
 * The House of Weddings - Premium Acoustic Sound Engine
 * Synthesizes ultra-refined tactile micro-interaction audio via the Web Audio API.
 * 100% offline, zero-latency, no external audio file dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  private listenersAttached: boolean = false;

  constructor() {
    // Check localStorage preference if available
    try {
      const stored = localStorage.getItem('thow_sound_muted');
      if (stored !== null) {
        this.isMuted = stored === 'true';
      }
    } catch {
      this.isMuted = false;
    }
  }

  /**
   * Lazy initializes the AudioContext upon the first user interaction
   * (conforming to modern browser autoplay policies).
   */
  private getContext(): AudioContext | null {
    if (this.isMuted) return null;

    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('thow_sound_muted', String(this.isMuted));
    } catch {}

    // Play a gentle feedback tap if unmuted
    if (!this.isMuted) {
      setTimeout(() => this.playClickSound(), 50);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  /**
   * Premium Tactile Click:
   * Crisp, subtle acoustic transient + soft wooden resonance.
   * Reminiscent of a luxury camera shutter or high-end mechanical timepiece.
   */
  public playClickSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Transient click noise burst
    const bufferSize = ctx.sampleRate * 0.015; // 15ms
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.Q.setValueAtTime(3.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.06, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Warm resonant tone layer
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.035);

    oscGain.gain.setValueAtTime(0.08, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    whiteNoise.start(now);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  /**
   * Premium Soft Keystroke Tap:
   * Whispering tactile tap with subtle randomized pitch variance,
   * giving the natural feel of a luxury fountain pen / premium mechanical keycap.
   */
  public playTypeSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Slight human pitch variance (±7%)
    const pitchJitter = 0.93 + Math.random() * 0.14;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(720 * pitchJitter, now);
    osc.frequency.exponentialRampToValueAtTime(160 * pitchJitter, now + 0.025);

    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  /**
   * Option / Toggle Chip Tap:
   * Warm pebble/marble tone for checkboxes, budget ranges, and tabs.
   */
  public playToggleSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1150, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.045);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Royal Chime (Submission / Success Sound):
   * An opulent, multi-harmonic chord with crystalline sustain (F# - A# - C# - F# / Royal Pentatonic).
   * Uplifting, celebratory, and dignified for wedding consultation confirmations.
   */
  public playSuccessSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // F#4 (370Hz), A#4 (466Hz), C#5 (554Hz), F#5 (740Hz), G#5 (830Hz)
    const chordNotes = [
      { freq: 369.99, delay: 0.0, gain: 0.12, duration: 1.4 },
      { freq: 466.16, delay: 0.06, gain: 0.11, duration: 1.5 },
      { freq: 554.37, delay: 0.12, gain: 0.10, duration: 1.7 },
      { freq: 739.99, delay: 0.18, gain: 0.09, duration: 2.0 },
      { freq: 830.61, delay: 0.24, gain: 0.07, duration: 2.2 },
    ];

    chordNotes.forEach(({ freq, delay, gain: noteGain, duration }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      // Subtle warm vibrato shimmer
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.value = 4.5;
      vibratoGain.gain.value = 1.8;
      vibrato.connect(osc.frequency);
      vibrato.start(now + delay);
      vibrato.stop(now + delay + duration);

      gainNode.gain.setValueAtTime(0.0001, now + delay);
      gainNode.gain.linearRampToValueAtTime(noteGain, now + delay + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + duration);
    });
  }

  public playClick() {
    this.playClickSound();
  }

  public playType() {
    this.playTypeSound();
  }

  public playSubmit() {
    this.playSuccessSound();
  }

  /**
   * Attaches global listeners to capture all clicks and keystrokes smoothly
   * across buttons, links, inputs, and form controls.
   */
  public attachGlobalListeners() {
    if (this.listenersAttached || typeof window === 'undefined') return;
    this.listenersAttached = true;

    // First interaction unlocks AudioContext
    const unlockAudio = () => {
      this.getContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
    window.addEventListener('keydown', unlockAudio, { passive: true, once: true });

    // Global click listener for all interactive elements
    window.addEventListener(
      'click',
      (e) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // Check if clicked element or its parent is interactive
        const interactive = target.closest(
          'button, a, input[type="checkbox"], input[type="radio"], select, [role="button"], summary'
        );

        if (interactive) {
          // If checkbox or radio or toggle chip
          if (
            interactive.tagName === 'INPUT' &&
            ((interactive as HTMLInputElement).type === 'checkbox' ||
              (interactive as HTMLInputElement).type === 'radio')
          ) {
            this.playToggleSound();
          } else {
            this.playClickSound();
          }
        }
      },
      { passive: true, capture: true }
    );

    // Global typing listener for inputs & textareas
    window.addEventListener(
      'keydown',
      (e) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable;

        if (isInput) {
          // Ignore modifier keys, tab, caps lock, arrow keys
          const ignoredKeys = [
            'Shift',
            'Control',
            'Alt',
            'Meta',
            'CapsLock',
            'Tab',
            'Escape',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
          ];

          if (!ignoredKeys.includes(e.key)) {
            this.playTypeSound();
          }
        }
      },
      { passive: true, capture: true }
    );
  }
}

// Global Singleton Instance
export const sound = new SoundEngine();
export const soundEngine = sound;
