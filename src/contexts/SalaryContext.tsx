import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from 'react';

interface WorkSchedule {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  label: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  category: string;
  daysToAfford: number;
}

interface EarningsHistory {
  day: number;
  month: number;
  year: number;
  amount: number;
  date?: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  target: number;
  icon: 'calendar' | 'dollar' | 'clock' | 'bookmark';
  type: 'streak' | 'earnings' | 'minutes' | 'wishlist';
}

type TimeView = 'day' | 'month' | 'year';

interface SalaryContextType {
  salary: number;
  setSalary: (salary: number) => void;
  period: 'monthly' | 'yearly';
  setPeriod: (period: 'monthly' | 'yearly') => void;
  workSchedules: WorkSchedule[];
  activeSchedule: WorkSchedule | null;
  setActiveSchedule: (schedule: WorkSchedule) => void;
  isWorkingHours: boolean;
  currentEarnings: number;
  dailyEarnings: number;
  hourlyEarnings: number;
  monthlyEarnings: number;
  yearlyEarnings: number;
  workProgress: number;
  wishlistItems: WishlistItem[];
  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'daysToAfford'>) => void;
  setWishlistItems: (items: WishlistItem[]) => void;
  removeWishlistItem: (id: string) => void;
  currentView: TimeView;
  setCurrentView: (view: TimeView) => void;
  accumulatedDailyEarnings: number;
  accumulatedMonthlyEarnings: number;
  accumulatedYearlyEarnings: number;
  addCustomSchedule: (schedule: Omit<WorkSchedule, 'label'>) => void;
  isCustomMode: boolean;
  setIsCustomMode: (isCustom: boolean) => void;
  updateEarningsTick: () => void;
  achievements: Achievement[];
  updateAchievement: (id: string, progress: number) => void;
  totalMinutesTracked: number;
  streakDays: number;
  totalEarned: number;
  earningsHistory: EarningsHistory[];
  currency: string;
    setCurrency: (currency: string) => void;
}

const SalaryContext = createContext<SalaryContextType | null>(null);

export const useSalary = () => {
  const context = useContext(SalaryContext);
  if (!context) throw new Error('useSalary must be used within a SalaryProvider');
  return context;
};

export const SalaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultWorkSchedules: WorkSchedule[] = [
    { startHour: 9, startMinute: 0, endHour: 17, endMinute: 0, label: '9 AM - 5 PM' },
    { startHour: 8, startMinute: 0, endHour: 16, endMinute: 0, label: '8 AM - 4 PM' },
    { startHour: 10, startMinute: 0, endHour: 18, endMinute: 0, label: '10 AM - 6 PM' },
    { startHour: 14, startMinute: 0, endHour: 22, endMinute: 0, label: '2 PM - 10 PM' },
  ];

  const defaultAchievements: Achievement[] = [
    { id: '1', title: '7 days streak', description: 'Track your earnings for 7 consecutive days', completed: false, progress: 0, target: 7, icon: 'calendar', type: 'streak' },
    { id: '2', title: '30 days streak', description: 'Track your earnings for 30 consecutive days', completed: false, progress: 0, target: 30, icon: 'calendar', type: 'streak' },
    { id: '3', title: '$1,000 earned', description: 'Earn a total of $1,000', completed: false, progress: 0, target: 1000, icon: 'dollar', type: 'earnings' },
    { id: '4', title: '$5,000 earned', description: 'Earn a total of $5,000', completed: false, progress: 0, target: 5000, icon: 'dollar', type: 'earnings' },
    { id: '5', title: '$10,000 earned', description: 'Earn a total of $10,000', completed: false, progress: 0, target: 10000, icon: 'dollar', type: 'earnings' },
    { id: '6', title: '100 minutes tracked', description: 'Track a total of 100 minutes', completed: false, progress: 0, target: 100, icon: 'clock', type: 'minutes' },
    { id: '7', title: '1000 minutes tracked', description: 'Track a total of 1000 minutes', completed: false, progress: 0, target: 1000, icon: 'clock', type: 'minutes' },
    { id: '8', title: '5 items in wishlist', description: 'Add 5 items to your wishlist', completed: false, progress: 0, target: 5, icon: 'bookmark', type: 'wishlist' },
  ];

  const [salary, setSalary] = useState(2243);
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [workSchedules] = useState(defaultWorkSchedules);
  const [activeSchedule, setActiveSchedule] = useState<WorkSchedule | null>(defaultWorkSchedules[0]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [workProgress, setWorkProgress] = useState(0);
  const [currentView, setCurrentView] = useState<TimeView>('day');
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [totalMinutesTracked, setTotalMinutesTracked] = useState(0);
  const [streakDays] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [earningsHistory, setEarningsHistory] = useState<EarningsHistory[]>([]);
  const [currency, setCurrency] = useState('EUR (€)');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isWorkingHours = useMemo(() => {
    if (!activeSchedule) return false;
    const now = currentTime;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const start = activeSchedule.startHour * 60 + activeSchedule.startMinute;
    const end = activeSchedule.endHour * 60 + activeSchedule.endMinute;
    return nowMinutes >= start && nowMinutes < end;
  }, [currentTime, activeSchedule]);

  const monthlyEarnings = period === 'monthly' ? salary : salary / 12;
  const yearlyEarnings = period === 'yearly' ? salary : salary * 12;
  const dailyEarnings = monthlyEarnings / 21.67;
  const hourlyEarnings = dailyEarnings / 8;

  const updateAchievement = useCallback((id: string, progress: number) => {
    setAchievements(prev =>
        prev.map(a => (a.id === id ? { ...a, progress, completed: progress >= a.target } : a))
    );
  }, []);

  const updateEarningsTick = useCallback(() => {
    if (!isWorkingHours || !activeSchedule) return;

    const now = new Date();
    const start = activeSchedule.startHour * 3600 + activeSchedule.startMinute * 60;
    const end = activeSchedule.endHour * 3600 + activeSchedule.endMinute * 60;
    const totalWorkSeconds = end - start; // Total work seconds based on custom schedule
    const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const progress = Math.min(Math.max((nowSec - start) / totalWorkSeconds, 0), 1);

    const earnedToday = dailyEarnings * progress;
    const earnedThisSecond = dailyEarnings / totalWorkSeconds; // Adjusted for custom work hours

    setWorkProgress(progress * 100);
    setCurrentEarnings(earnedToday);
    setTotalEarned(prev => {
      const total = prev + earnedThisSecond;
      updateAchievement('3', total);
      updateAchievement('4', total);
      updateAchievement('5', total);

      setEarningsHistory(prevHistory => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        const existingEntry = prevHistory.find(
            entry => entry.day === day && entry.month === month && entry.year === year
        );

        if (existingEntry) {
          return prevHistory.map(entry =>
              entry === existingEntry
                  ? { ...entry, amount: entry.amount + earnedThisSecond }
                  : entry
          );
        } else {
          return [...prevHistory, { day, month, year, amount: earnedThisSecond }];
        }
      });

      return total;
    });

    setTotalMinutesTracked(prev => {
      const newMinutes = prev + 1 / 60;
      updateAchievement('6', newMinutes);
      updateAchievement('7', newMinutes);
      return newMinutes;
    });
  }, [activeSchedule, dailyEarnings, isWorkingHours, updateAchievement]);

  const addWishlistItem = (item: Omit<WishlistItem, 'id' | 'daysToAfford'>) => {
    setWishlistItems(prev => {
      const newItem: WishlistItem = {
        ...item,
        id: crypto.randomUUID(),
        daysToAfford: item.price / dailyEarnings,
      };
      const newList = [...prev, newItem];
      updateAchievement('8', newList.length);
      return newList;
    });
  };

  const removeWishlistItem = (id: string) =>
      setWishlistItems(prev => prev.filter(item => item.id !== id));

  const addCustomSchedule = (schedule: Omit<WorkSchedule, 'label'>) => {
    const label = `${schedule.startHour}:${schedule.startMinute
        .toString()
        .padStart(2, '0')} - ${schedule.endHour}:${schedule.endMinute
        .toString()
        .padStart(2, '0')}`;
    setActiveSchedule({ ...schedule, label });
    setIsCustomMode(true);
  };

  const accumulatedMonthlyEarnings = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return earningsHistory
        .filter(entry => entry.month === currentMonth && entry.year === currentYear)
        .reduce((total, entry) => total + entry.amount, 0);
  }, [earningsHistory]);

  const accumulatedYearlyEarnings = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return earningsHistory
        .filter(entry => entry.year === currentYear)
        .reduce((total, entry) => total + entry.amount, 0);
  }, [earningsHistory]);

  return (
      <SalaryContext.Provider
          value={{
            salary,
            setSalary,
            currency,
            setCurrency,
            period,
            setPeriod,
            workSchedules,
            activeSchedule,
            setActiveSchedule,
            isWorkingHours,
            currentEarnings,
            dailyEarnings,
            hourlyEarnings,
            monthlyEarnings,
            yearlyEarnings,
            workProgress,
            wishlistItems,
            addWishlistItem,
            setWishlistItems,
            removeWishlistItem,
            currentView,
            setCurrentView,
            accumulatedDailyEarnings: currentEarnings,
            accumulatedMonthlyEarnings,
            accumulatedYearlyEarnings,
            addCustomSchedule,
            isCustomMode,
            setIsCustomMode,
            updateEarningsTick,
            achievements,
            updateAchievement,
            totalMinutesTracked,
            streakDays,
            totalEarned,
            earningsHistory,
          }}
      >
        {children}
      </SalaryContext.Provider>
  );
};