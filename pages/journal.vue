<template>
  <div class="space-y-16">
    <section class="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
      <div class="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-primary-500">Journal</p>
          <h1 class="mt-4 text-4xl font-semibold text-slate-900">Stories from the studio and the trail</h1>
          <p class="mt-4 text-base leading-7 text-slate-600">
            Interviews, gear breakdowns, and travel dispatches that unpack how our community explores the world.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
          <p class="font-semibold text-slate-900">New issues every month</p>
          <p class="mt-2">Subscribe to the newsletter for exclusive long-form pieces and early looks at collaborations.</p>
        </div>
      </div>
    </section>

    <StoryHighlights />

    <section class="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
      <h2 class="section-title">Featured contributors</h2>
      <p class="section-subtitle">The voices shaping our latest dispatches.</p>
      <div class="mt-10 grid gap-8 md:grid-cols-2">
        <article v-for="author in contributors" :key="author.name" class="rounded-2xl border border-slate-200 p-6">
          <p class="text-sm font-semibold text-primary-500">{{ author.role }}</p>
          <h3 class="mt-2 text-xl font-semibold text-slate-900">{{ author.name }}</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">{{ author.bio }}</p>
        </article>
      </div>
    </section>

    <NewsletterBanner />
  </div>
</template>

<script setup lang="ts">
import NewsletterBanner from '@/components/NewsletterBanner.vue'
import StoryHighlights from '@/components/StoryHighlights.vue'

const contributors = [
  {
    name: 'Mason Kho',
    role: 'Athlete in residence',
    bio: 'Ultra runner documenting multi-day expeditions, gear experiments, and the training rituals that keep him grounded.'
  },
  {
    name: 'Dr. Sora Kwok',
    role: 'Materials scientist',
    bio: 'Researches textile innovation and shares deep dives into regenerative fibers, comfort science, and responsible dye processes.'
  },
  {
    name: 'Lina Alvarez',
    role: 'Travel photographer',
    bio: 'Captures architectural textures and candid street moments from residencies across Mexico City, Lisbon, and Taipei.'
  },
  {
    name: 'The Atelier Team',
    role: 'Design collective',
    bio: 'Offers behind-the-scenes sketches, pattern experiments, and collaborative playlists that inform each collection.'
  }
]
</script>
