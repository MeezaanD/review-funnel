export interface Business {
	id: string;
	name: string;
	email: string;
	googleProfileUrl: string;
	logoUrl: string | null;
	displayBanner: string | null;
	primaryColor: string;
	secondaryColor: string;
	pageBackgroundColor: string; // Main page background
	contentCardColor: string; // Inner content card background
	starContainerColor: string; // Star rating container background
	createdAt: number;
}