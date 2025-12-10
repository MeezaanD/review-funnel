<template>
	<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-6 sm:px-6">
		<div class="max-w-xl mx-auto space-y-6">
			<!-- Success Card -->
			<div
				class="bg-white/95 backdrop-blur rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-10 text-center space-y-6">
				<!-- Success Icon -->
				<div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
					<svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<!-- Success Message -->
				<div class="space-y-2">
					<h1 class="text-3xl font-semibold text-slate-900">Thank you!</h1>
					<p class="text-base text-slate-500">Your feedback has been submitted successfully.</p>
				</div>
			</div>

			<!-- Additional Navigation -->
			<div class="text-center text-sm text-slate-500">
				Your feedback helps businesses improve.
			</div>
		</div>
	</div>
</template>