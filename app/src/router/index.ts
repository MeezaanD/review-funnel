import { createRouter, createWebHistory } from "vue-router";
import { isLoggedIn } from "../services/auth";

const routes = [
	{ path: "/", name: "Home", component: () => import("../pages/Home.vue") },
	{ path: "/login", name: "Login", component: () => import("../pages/Login.vue") },
	{
		path: "/create",
		name: "CreateBusiness",
		component: () => import("../pages/CreateBusiness.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../pages/Admin.vue"),
		meta: { requiresAuth: true },
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
		path: "/:catchAll(.*)",
		redirect: "/",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// Route guard
router.beforeEach((to, _from, next) => {
	if (to.meta.requiresAuth && !isLoggedIn()) {
		next({ name: "Login" });
	} else {
		next();
	}
});

export default router;
