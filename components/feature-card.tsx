import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  header: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function FeatureCard({ icon, header, description, imageSrc, imageAlt }: FeatureCardProps) {
  return (
    <Card >
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold text-gray-900 mb-3 flex items-center justify-center">
          <span className="text-teal-500 mr-3 text-2xl">{icon}</span>
          {header}
        </CardTitle>
        <CardDescription className="text-gray-600 mb-4">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={400}
          className="rounded-md w-full max-w-full"
          unoptimized={true}
        />
      </CardContent>
    </Card>
  );
}
