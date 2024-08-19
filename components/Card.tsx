import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type card = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};
export default function CardComponent({ title, description, children, className }: card) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={cn("", className)}>{children}</CardContent>
    </Card>
  );
}
