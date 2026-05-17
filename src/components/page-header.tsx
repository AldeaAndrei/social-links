import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assetUrl } from "@/lib/assets";
import type { ResolvedContent } from "@/types/content";

interface PageHeaderProps {
  profile: ResolvedContent["profile"];
}

export function PageHeader({ profile }: PageHeaderProps) {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="relative -mx-4">
      <div className="relative h-36 w-full overflow-hidden sm:h-44">
        <img
          src={assetUrl(profile.banner)}
          alt=""
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-12 bg-background"
          style={{ clipPath: "ellipse(75% 100% at 50% 100%)" }}
        />
      </div>

      <div className="-mt-14 flex flex-col items-center px-4 pb-2 text-center">
        <Avatar className="size-24 border-4 border-background shadow-md">
          <AvatarImage src={assetUrl(profile.avatar)} alt={profile.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{profile.tagline}</p>
      </div>
    </header>
  );
}
