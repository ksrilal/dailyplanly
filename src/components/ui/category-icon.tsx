import {
  Zap, Heart, TrendingUp, BookOpen, Sun, Home, Briefcase, MapPin,
  CalendarDays, Table2, CheckSquare, GitCommitHorizontal,
  StickyNote, Target, Clock, Focus, BarChart2,
  type LucideProps,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Zap, Heart, TrendingUp, BookOpen, Sun, Home, Briefcase, MapPin,
  CalendarDays, Table2, CheckSquare, GitCommitHorizontal,
  StickyNote, Target, Clock, Focus, BarChart2,
}

interface CategoryIconProps extends LucideProps {
  name: string
  className?: string
}

export function CategoryIcon({ name, className, ...props }: CategoryIconProps) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon className={cn('h-5 w-5', className)} strokeWidth={1.5} {...props} />
}
