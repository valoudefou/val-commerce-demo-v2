<template>
  <div class="space-y-16">
    <section class="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-2xl">
      <div class="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-primary-300">About {{ companyName }}</p>
          <h1 class="mt-4 text-4xl font-semibold">Designing pieces that move with you</h1>
          <p class="mt-4 text-base leading-7 text-slate-200">
            We pair technical performance fabrics with tailored silhouettes so you can pack light, travel far, and stay comfortable everywhere in between.
          </p>
          <p class="mt-6 text-sm text-slate-300">
            Founded in 2016, the studio spans Paris, Vancouver, and Tokyo, giving every collection a global perspective on city exploration.
          </p>
        </div>
        <div class="rounded-3xl bg-white/10 p-8 text-sm leading-6 text-slate-100 ring-1 ring-white/20">
          <p class="font-semibold text-white">Sustainability highlights</p>
          <ul class="mt-4 space-y-3">
            <li v-for="fact in sustainabilityFacts" :key="fact" class="flex items-start gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-primary-300"></span>
              <span>{{ fact }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
      <h2 class="section-title">Our values</h2>
      <p class="section-subtitle">A few principles that inform every sketch, fabric test, and partnership we pursue.</p>
      <dl class="mt-10 grid gap-8 md:grid-cols-2">
        <div v-for="value in values" :key="value.title" class="rounded-2xl border border-slate-200 p-6">
          <dt class="text-base font-semibold text-slate-900">{{ value.title }}</dt>
          <dd class="mt-3 text-sm leading-6 text-slate-600">{{ value.body }}</dd>
        </div>
      </dl>
    </section>

    <FeatureGrid />

    <section class="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-100">
      <h2 class="section-title">Milestones</h2>
      <p class="section-subtitle">Snapshots from the journey so far.</p>
      <ul class="mt-10 space-y-6">
        <li v-for="milestone in milestones" :key="milestone.year" class="flex flex-col gap-2 rounded-2xl border border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.25em] text-primary-500">{{ milestone.year }}</p>
            <p class="mt-1 text-base font-semibold text-slate-900">{{ milestone.title }}</p>
          </div>
          <p class="text-sm leading-6 text-slate-600 sm:max-w-lg">{{ milestone.description }}</p>
        </li>
      </ul>
    </section>

    <NewsletterBanner />
  </div>
</template>

<script setup lang="ts">
import FeatureGrid from '@/components/FeatureGrid.vue'
import NewsletterBanner from '@/components/NewsletterBanner.vue'

const config = useRuntimeConfig()
const companyName = config.public.companyName

const sustainabilityFacts = [
  '68% of fabrics in the Spring collection are bluesign® approved or recycled.',
  'All packaging is curbside recyclable and printed with soy-based inks.',
  '1% of every order funds trail restoration programs across North America.'
]

const values = [
  {
    title: 'Purposeful versatility',
    body: 'Every product needs to justify space in your carry-on. If it does not transition between work, travel, and downtime, it does not ship.'
  },
  {
    title: 'Radical transparency',
    body: 'We share the origin, certifications, and true cost breakdown of every piece to empower more mindful decisions.'
  },
  {
    title: 'Circular mindset',
    body: 'Repairs, trade-ins, and recycling keep products in rotation longer and reduce textile waste headed to landfills.'
  },
  {
    title: 'Human-scale production',
    body: 'Small batch runs help us maintain fair-wage partnerships and react quickly to customer feedback.'
  }
]

const milestones = [
  {
    year: '2016',
    title: 'Studio founded',
    description: 'Launched with a three-piece capsule inspired by long-haul flights and impromptu city adventures.'
  },
  {
    year: '2019',
    title: 'Global warehouse network',
    description: 'Opened fulfillment hubs in the EU and Asia-Pacific to cut delivery times and emissions.'
  },
  {
    year: '2022',
    title: 'Regenerative materials program',
    description: 'Committed to sourcing regenerative cotton and wool from verified farms and cooperatives.'
  },
  {
    year: '2024',
    title: 'Flagship residency series',
    description: 'Hosted monthly residencies spotlighting designers, athletes, and researchers shaping the future of movement.'
  }
]
</script>
