import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assetUrl } from "@/lib/assets";
import type { ResolvedContent } from "@/types/content";

const bannerImageClass =
  "absolute inset-0 h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)]";

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
      <div className="relative h-36 w-full sm:h-44">
        <img
          src={assetUrl(profile.bannerLight)}
          alt=""
          className={`${bannerImageClass} dark:hidden`}
        />
        <img
          src={assetUrl(profile.bannerDark)}
          alt=""
          className={`${bannerImageClass} hidden dark:block`}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] min-h-5 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 -mt-14 flex flex-col items-center px-4 pb-2 text-center">
        <Avatar className="size-24 border-4 border-background bg-background shadow-md">
          <AvatarImage src={assetUrl(profile.avatar)} alt={profile.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{profile.tagline}</p>
      </div>
    </header>
  );
}
