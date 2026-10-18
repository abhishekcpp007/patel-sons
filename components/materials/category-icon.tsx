import { Boxes, Layers, BrickWall, Droplets, Zap, PaintRoller, DoorOpen, Hammer, Sparkles } from "lucide-react";
import type { MaterialCategory } from "@/content/materials";

const map = { cement: Boxes, steel: Hammer, brick: BrickWall, sand: Layers, tile: Sparkles, plumbing: Droplets, electrical: Zap, paint: PaintRoller, door: DoorOpen };

export function CategoryIcon({ icon, className }: { icon: MaterialCategory["icon"]; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} />;
}
