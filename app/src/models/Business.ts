export interface Business {
	id: string;
	name: string;
	email: string;
	googleProfileUrl: string;
	logoUrl: string | null;
	displayBanner: string | null;
	primaryColor: string;
	secondaryColor: string;
	createdAt: number;
}
