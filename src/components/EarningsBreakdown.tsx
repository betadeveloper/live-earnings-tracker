import React from 'react';
import { BriefcaseIcon, CalendarIcon, SunIcon, HourglassIcon } from 'lucide-react';
import { useSalary } from '../contexts/SalaryContext';
const EarningsBreakdown: React.FC = () => {
  const {
    yearlyEarnings,
    monthlyEarnings,
    dailyEarnings,
    hourlyEarnings
  } = useSalary();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount).replace(/\s/g, '');
  };
  return <div className="bg-white rounded-lg p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex flex-col items-center p-4 border-r border-gray-100">
        <div className="bg-blue-100 p-3 rounded-full mb-2">
          <BriefcaseIcon className="text-blue-600" size={20} />
        </div>
        <span className="text-gray-600 mb-1">Yearly</span>
        <span className="text-xl font-bold">
          {formatCurrency(yearlyEarnings)}
        </span>
      </div>
      <div className="flex flex-col items-center p-4 border-r border-gray-100">
        <div className="bg-purple-100 p-3 rounded-full mb-2">
          <CalendarIcon className="text-purple-600" size={20} />
        </div>
        <span className="text-gray-600 mb-1">Monthly</span>
        <span className="text-xl font-bold">
          {formatCurrency(monthlyEarnings)}
        </span>
      </div>
      <div className="flex flex-col items-center p-4 border-r border-gray-100">
        <div className="bg-green-100 p-3 rounded-full mb-2">
          <SunIcon className="text-green-600" size={20} />
        </div>
        <span className="text-gray-600 mb-1">Daily</span>
        <span className="text-xl font-bold">
          {formatCurrency(dailyEarnings)}
        </span>
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="bg-yellow-100 p-3 rounded-full mb-2">
          <HourglassIcon className="text-yellow-600" size={20} />
        </div>
        <span className="text-gray-600 mb-1">Hourly</span>
        <span className="text-xl font-bold">
          {formatCurrency(hourlyEarnings)}
        </span>
      </div>
    </div>;
};
export default EarningsBreakdown;