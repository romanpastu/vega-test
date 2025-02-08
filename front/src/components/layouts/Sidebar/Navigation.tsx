import { NAV_ITEMS } from "@/constants/navigation";
import { Link, useMatches } from "@tanstack/react-router";

const NavLink = ({ item }: { item: NavItem }) => {
  const matches = useMatches();
  const currentPath = matches.at(-1)?.pathname;
  const isActive = currentPath?.startsWith(item.path);
  const Icon = item.icon;

  return (
    <Link to={item.path} className="relative group" title={item.label}>
      {isActive && (
        <div className="absolute -left-4 w-1 h-8 bg-primary rounded-r-full" />
      )}
      <div
        className={`p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
        data-testid={item.label.toLowerCase().replace(' ', '-')}
      >
        <Icon size={20} />
      </div>
    </Link>
  );
};

export const Navigation = () => {
  return (
    <nav className="flex flex-col items-center gap-4 mt-8">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.path} item={item}/>
      ))}
    </nav>
  );
}; 