<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  interface Props {
    sitekey: string;
    onSolved?: (solution: string) => void;
    onError?: (error: string) => void;
  }
  
  let { sitekey, onSolved, onError }: Props = $props();
  
  let containerRef: HTMLDivElement | undefined = $state();
  let widget: any = $state(null);
  let isLoaded = $state(false);
  let solution = $state('');
  
  type FriendlyChallenge = {
    WidgetInstance: new (
      container: HTMLElement,
      options: {
        sitekey: string;
        startMode: string;
        doneCallback: (solution: string) => void;
        errorCallback: (error: any) => void;
      }
    ) => {
      destroy: () => void;
    };
  };
  
  onMount(() => {
    // Load Friendly Captcha script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.14/widget.module.min.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isLoaded = true;
      initWidget();
    };
    
    script.onerror = () => {
      onError?.('Failed to load Friendly Captcha script');
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup script if component unmounts before load
      if (!isLoaded && script.parentNode) {
        document.head.removeChild(script);
      }
    };
  });
  
  function initWidget() {
    if (!containerRef) return;
    
    const friendlyChallenge = (window as any).friendlyChallenge as FriendlyChallenge | undefined;
    if (!friendlyChallenge) return;
    
    try {
      widget = new friendlyChallenge.WidgetInstance(containerRef, {
        sitekey,
        startMode: 'auto',
        doneCallback: (solutionToken: string) => {
          solution = solutionToken;
          onSolved?.(solutionToken);
        },
        errorCallback: (error: any) => {
          onError?.(error?.message || 'Captcha error occurred');
        }
      });
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to initialize captcha');
    }
  }
  
  onDestroy(() => {
    if (widget && typeof widget.destroy === 'function') {
      widget.destroy();
    }
  });
  
  // Re-initialize widget when container becomes available
  $effect(() => {
    if (isLoaded && containerRef && !widget) {
      initWidget();
    }
  });
</script>

<div bind:this={containerRef} class="friendly-captcha-container"></div>

<style>
  .friendly-captcha-container {
    min-height: 60px;
  }
  
  :global(.frc-banner) {
    position: static !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0.5rem auto 0 !important;
    text-align: center !important;
    width: 100% !important;
    left: auto !important;
    right: auto !important;
  }
</style>

