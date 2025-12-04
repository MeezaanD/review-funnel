import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{ path: "/", name: "Home", component: () => import("../pages/Home.vue") },
	{
		path: "/create",
		name: "CreateBusiness",
		component: () => import("../pages/CreateBusiness.vue"),
	},
	{
		path: "/:businessId",
		name: "Funnel",
		component: () => import("../pages/FunnelPage.vue"),
	},
	{
		path: "/:businessId/feedback",
		name: "Feedback",
		component: () => import("../pages/FeedbackPage.vue"),
	},
	{
		path: "/thank-you",
		name: "ThankYou",
		component: () => import("../pages/ThankYou.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../pages/Admin.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
