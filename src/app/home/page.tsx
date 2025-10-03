
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, ListChecks, TrendingUp, BellDot } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  { name: "Nimmagadda Yatheeswar", dataAiHint: "person portrait" },
  { name: "Nishanam Pranuthi Raj", dataAiHint: "person portrait" },
  { name: "Hrudhay", dataAiHint: "person portrait" },
  { name: "Devyansh", dataAiHint: "person portrait" },
  { name: "Havisha", dataAiHint: "person portrait" },
  { name: "Pragnya", dataAiHint: "person portrait" },
];

const keyAspects = [
    { title: "Secure Bank Linking", description: "Effortlessly connect your bank accounts with top-tier security.", icon: ShieldCheck, color: "text-green-500" },
    { title: "Custom Categories", description: "Tailor spending categories to your unique lifestyle and track expenses precisely.", icon: ListChecks, color: "text-blue-500" },
    { title: "Flexible Budget Limits", description: "Set and adjust monthly or yearly limits for each category with ease.", icon: TrendingUp, color: "text-purple-500" },
    { title: "Instant Notifications", description: "Stay informed with real-time alerts about your spending and budget status.", icon: BellDot, color: "text-yellow-500" },
];

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold font-headline mb-4 text-primary">About Us</h1>
        <p className="text-lg text-foreground/80 max-w-4xl mb-12">
            At PennyPilot, we understand that managing money can feel overwhelming. We’re a team of finance enthusiasts, university toppers, and software developers who experienced firsthand how easy it is to lose track of spending—especially when life is busy with classes, projects, and everyday expenses.
            Our mission is simple: make budgeting effortless. By combining intuitive design with robust security, we give you a clear, real-time picture of where your money goes. No confusing spreadsheets, no hours spent reconciling bank statements—just actionable insights that empower you to make smarter financial choices. Whether you’re saving for a dream trip, covering tuition costs, or simply trying to curb impulsive shopping, PennyPilot is here to guide you.
        </p>

        <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8 text-primary">Key Aspects We Focus On</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyAspects.map((aspect, index) => {
                const Icon = aspect.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow bg-card border-t-4 border-primary/50">
                    <CardHeader className="p-0 mb-4">
                      <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 ring-4 ring-primary/20">
                         <Icon className={`h-7 w-7 ${aspect.color || 'text-primary'}`} />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <h3 className="text-lg font-semibold text-primary mb-2">{aspect.title}</h3>
                      <p className="text-sm text-card-foreground/80">{aspect.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
        </div>

        <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-center my-12 text-primary">Meet the Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                {teamMembers.map((member) => (
                <div key={member.name} className="group text-center">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-2 border-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl cursor-pointer">
                    {member.imageUrl ? (
                        <Image src={member.imageUrl} alt={member.name} width={128} height={128} className="w-full h-full object-cover" data-ai-hint={member.dataAiHint} />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">Photo</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs sm:text-sm p-1 text-center">Class 12 Student</p>
                    </div>
                    </div>
                    <h4 className="font-semibold text-sm sm:text-base text-foreground">{member.name}</h4>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
}
