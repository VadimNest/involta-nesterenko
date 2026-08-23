<template>
  <div class="app">
    <div class="container">
      <OrganismsHeader />
      <OrganismsToolbar />
    </div>

    <main class="app__main">
      <div class="app__main-content">
        <div class="container">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
