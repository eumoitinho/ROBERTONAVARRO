import NextImage from "next/image";
import { SectionBadge } from "@/components/section-badge";
import { cn } from "@/lib/utils";

const notableParticipants = [
	{
		name: "Alfredo Soares",
		role: "Autoridade em vendas e autor best-seller",
		image: "/images/alfredo-soares.webp",
		testimonial:
			"Uma experiência transformadora que mudou minha visão sobre dinheiro e negócios.",
	},
	{
		name: "Tiago Brunet",
		role: "Referência em treinamento de líderes e espiritualidade",
		image: "/images/tiago-brunet.webp",
		testimonial:
			"Roberto tem um dom único de unir princípios espirituais e financeiros de forma prática.",
	},
	{
		name: "Flávio Prado",
		role: "Jornalista esportivo que já cobriu 10 Copas do Mundo",
		image: "/images/flavio-prado.webp",
		testimonial:
			"Aprendi mais sobre finanças em um dia do que em anos de leituras e cursos.",
	},
	{
		name: "Pyong Lee",
		role: "Hipnólogo e youtuber com mais de 8 milhões de inscritos",
		image: "/images/pyong-lee.webp",
		testimonial:
			"Uma metodologia que realmente funciona e transforma a mentalidade sobre dinheiro.",
	},
];

type Accent = "yellow" | "red";

type AccentStyles = {
	topLine: string;
	highlightGradient: string;
	cardHover: string;
	topBar: string;
	nameColor: string;
	shadow: string;
};

const accentStyles: Record<Accent, AccentStyles> = {
	yellow: {
		topLine: "bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent",
		highlightGradient: "bg-gradient-to-r from-yellow-400 to-amber-500",
		cardHover: "hover:border-yellow-400/40",
		topBar: "bg-gradient-to-r from-yellow-400 to-amber-500",
		nameColor: "text-yellow-400",
		shadow: "hover:shadow-yellow-400/10",
	},
	red: {
		topLine: "bg-gradient-to-r from-transparent via-red-500/30 to-transparent",
		highlightGradient: "bg-gradient-to-r from-red-500 to-red-600",
		cardHover: "hover:border-red-500/40",
		topBar: "bg-gradient-to-r from-red-500 to-red-600",
		nameColor: "text-red-400",
		shadow: "hover:shadow-red-500/10",
	},
};

interface NotableParticipantsProps {
	accent?: Accent;
}

export default function NotableParticipants({
	accent = "yellow",
}: NotableParticipantsProps) {
	const styles = accentStyles[accent];

	return (
		<section className="relative py-24">
			<div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-900/95 to-zinc-900/95" />
			<div className={cn("absolute top-0 left-0 right-0 h-px", styles.topLine)} />
			<div className="container relative z-10 mx-auto px-4">
				<div className="mb-20 text-center">
					<SectionBadge text="PARTICIPANTES" />
					<h2 className="text-2xl md:text-3xl font-bold leading-tight">
						JÁ PASSARAM POR{" "}
						<span
							className={cn(
								"text-transparent bg-clip-text",
								styles.highlightGradient
							)}
						>
							NOSSOS TREINAMENTOS
						</span>
					</h2>
					<p className="mx-auto max-w-4xl text-lg leading-relaxed text-zinc-300">
						Conheça algumas personalidades que já participaram dos nossos eventos
					</p>
				</div>
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{notableParticipants.map((person, index) => (
						<div
							key={index}
											className={cn(
												"group overflow-hidden rounded-3xl border border-zinc-700/30 bg-zinc-900/40 backdrop-blur-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl",
								styles.cardHover,
								styles.shadow
							)}
						>
							<div className={cn("h-1 w-full", styles.topBar)}></div>
							<div className="p-6">
								<div className="relative mb-6 h-48 overflow-hidden rounded-2xl">
									<NextImage
										src={person.image || "/placeholder.svg"}
										alt={person.name}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
								<h3
									className={cn(
										"mb-2 text-xl font-bold",
										styles.nameColor
									)}
								>
									{person.name}
								</h3>
								<p className="mb-4 leading-relaxed text-zinc-300">
									{person.role}
								</p>
								<div className="rounded-2xl border border-zinc-700/30 bg-zinc-800/40 p-4">
									<p className="text-sm italic leading-relaxed text-zinc-300">
										&ldquo;{person.testimonial}&rdquo;
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
