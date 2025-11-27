<script lang="ts">
  import Icon from './Icon.svelte';
  import FriendlyCaptcha from './FriendlyCaptcha.svelte';
  
  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  
  let isSubmitting = $state(false);
  let submitSuccess = $state(false);
  let submitError = $state('');
  let captchaSolution = $state('');
  let captchaError = $state('');
  
  let errors = $state({
    name: '',
    email: '',
    subject: '',
    message: '',
    captcha: ''
  });
  
  function validate(): boolean {
    let isValid = true;
    errors = { name: '', email: '', subject: '', message: '', captcha: '' };
    
    if (!name.trim()) {
      errors.name = 'Please enter your name';
      isValid = false;
    } else if (name.length > 255) {
      errors.name = 'Name cannot exceed 255 characters';
      isValid = false;
    }
    
    if (!email.trim()) {
      errors.email = 'Please enter your email';
      isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    } else if (email.length > 250) {
      errors.email = 'Email cannot exceed 250 characters';
      isValid = false;
    }
    
    if (!subject.trim()) {
      errors.subject = 'Please enter a subject';
      isValid = false;
    } else if (subject.length > 255) {
      errors.subject = 'Subject cannot exceed 255 characters';
      isValid = false;
    }
    
    if (!message.trim()) {
      errors.message = 'Please enter your message';
      isValid = false;
    } else if (message.length > 3500) {
      errors.message = 'Message cannot exceed 3500 characters';
      isValid = false;
    }
    
    if (!captchaSolution) {
      errors.captcha = 'Please complete the captcha verification';
      isValid = false;
    }
    
    return isValid;
  }
  
  function handleCaptchaSolved(solution: string) {
    captchaSolution = solution;
    captchaError = '';
    errors.captcha = '';
  }
  
  function handleCaptchaError(error: string) {
    captchaError = error;
    captchaSolution = '';
    errors.captcha = error;
  }
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!validate()) return;
    
    isSubmitting = true;
    submitError = '';
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message, captchaSolution })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        submitSuccess = true;
      } else {
        submitError = result.error || 'Something went wrong. Please try again.';
      }
    } catch (err) {
      submitError = 'Failed to send message. Please try again later.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if submitSuccess}
  <div class="text-center py-20">
    <div class="success-icon mx-auto mb-8">
      <Icon name="exclamation-circle" />
    </div>
    <h2 class="text-3xl font-bold mb-4 font-heading text-sepia-dark">Thank you!</h2>
    <p class="text-lg text-sepia-light">I will get back to you as soon as possible!</p>
    <a 
      href="/"
      class="inline-block mt-8 px-8 py-3 rounded-sm font-bold transition-all hover:-translate-y-1 bg-forest-green text-parchment font-heading"
    >
      Back to Home
    </a>
  </div>
{:else}
  <form onsubmit={handleSubmit} class="max-w-lg mx-auto space-y-6">
    <h1 class="text-4xl font-bold text-center mb-8 font-heading text-sepia-dark">
      Send me a message
    </h1>
    
    {#if submitError}
      <div class="p-4 rounded-sm border-2 mb-6 bg-deep-red-background border-deep-red text-deep-red">
        {submitError}
      </div>
    {/if}
    
    <div class="space-y-2">
      <input
        type="text"
        bind:value={name}
        placeholder="Name"
        maxlength={255}
        class="w-full px-6 py-4 rounded-full text-lg outline-none transition-all focus:ring-2 bg-background border-2 {errors.name ? 'border-deep-red' : 'border-sepia-light'} text-sepia-dark font-body"
      />
      {#if errors.name}
        <p class="text-sm px-6 text-deep-red">{errors.name}</p>
      {/if}
    </div>
    
    <div class="space-y-2">
      <input
        type="email"
        bind:value={email}
        placeholder="E-mail"
        maxlength={250}
        class="w-full px-6 py-4 rounded-full text-lg outline-none transition-all focus:ring-2 bg-background border-2 {errors.email ? 'border-deep-red' : 'border-sepia-light'} text-sepia-dark font-body"
      />
      {#if errors.email}
        <p class="text-sm px-6 text-deep-red">{errors.email}</p>
      {/if}
    </div>
    
    <div class="space-y-2">
      <input
        type="text"
        bind:value={subject}
        placeholder="Subject"
        maxlength={255}
        class="w-full px-6 py-4 rounded-full text-lg outline-none transition-all focus:ring-2 bg-background border-2 {errors.subject ? 'border-deep-red' : 'border-sepia-light'} text-sepia-dark font-body"
      />
      {#if errors.subject}
        <p class="text-sm px-6 text-deep-red">{errors.subject}</p>
      {/if}
    </div>
    
    <div class="space-y-2">
      <textarea
        bind:value={message}
        placeholder="Your Message"
        maxlength={3500}
        rows={6}
        class="w-full px-6 py-4 rounded-3xl text-lg outline-none transition-all focus:ring-2 resize-none bg-background border-2 {errors.message ? 'border-deep-red' : 'border-sepia-light'} text-sepia-dark font-body"
      ></textarea>
      {#if errors.message}
        <p class="text-sm px-6 text-deep-red">{errors.message}</p>
      {/if}
    </div>
    
    <div class="space-y-2">
      <FriendlyCaptcha 
        sitekey={import.meta.env.PUBLIC_CAPTCHA_SITE_KEY || ''}
        onSolved={handleCaptchaSolved}
        onError={handleCaptchaError}
      />
      {#if errors.captcha}
        <p class="text-sm px-6 text-deep-red">{errors.captcha}</p>
      {/if}
      {#if captchaError}
        <p class="text-sm px-6 text-deep-red">{captchaError}</p>
      {/if}
    </div>
    
    <div class="text-center pt-4">
      <button
        type="submit"
        disabled={isSubmitting}
        class="px-12 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto bg-forest-green text-parchment font-heading shadow-lg"
      >
        {#if isSubmitting}
          <Icon name="loading" />
          Sending...
        {:else}
          <Icon name="paper-airplane" />
          Send Message
        {/if}
      </button>
    </div>
  </form>
{/if}
