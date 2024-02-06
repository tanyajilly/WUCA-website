import Image from "next/image";

export default function ComingSoon() {

	return (
		<div className="fixed w-screen h-screen inset-0 bg-white flex flex-col items-center justify-center p-4">
			<Image
				className=""
				src="/logo.jpg"
				alt="WUCA"
				width="600"
				height="300"
			/>
			<p className="max-w-lg text-lg text-center">Our website is on its way! We&apos;re busy crafting a site that will offer you the best experience possible. In the meantime, follow us on <a href="https://www.facebook.com/wuca.official">Facebook</a> to get the latest updates and be the first to know when we go live</p>
		</div>
	);
}
