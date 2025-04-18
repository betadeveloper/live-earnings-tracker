import React, { useState } from 'react';
import { CalendarCheckIcon, EuroIcon, ClockIcon } from 'lucide-react';
import { useSalary } from '../contexts/SalaryContext';

const WorkSchedule: React.FC = () => {
  const {
    salary,
    setSalary,
    period,
    setPeriod,
    workSchedules,
    activeSchedule,
    setActiveSchedule,
    addCustomSchedule,
    isCustomMode,
    setIsCustomMode,
    currency,
    setCurrency,
  } = useSalary();

  const [customSchedule, setCustomSchedule] = useState({
    startHour: 9,
    startMinute: 0,
    startPeriod: 'AM',
    endHour: 5,
    endMinute: 0,
    endPeriod: 'PM',
  });

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSalary(value);
    } else {
      setSalary(0);
    }
  };

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const handleCustomScheduleSave = () => {
    let startHour = parseInt(customSchedule.startHour.toString());
    let endHour = parseInt(customSchedule.endHour.toString());

    if (customSchedule.startPeriod === 'PM' && startHour !== 12) {
      startHour += 12;
    } else if (customSchedule.startPeriod === 'AM' && startHour === 12) {
      startHour = 0;
    }

    if (customSchedule.endPeriod === 'PM' && endHour !== 12) {
      endHour += 12;
    } else if (customSchedule.endPeriod === 'AM' && endHour === 12) {
      endHour = 0;
    }

    const isNextDay =
        endHour < startHour ||
        (endHour === startHour && customSchedule.endMinute < customSchedule.startMinute);

    addCustomSchedule({
      startHour,
      startMinute: customSchedule.startMinute,
      endHour: isNextDay ? endHour + 24 : endHour,
      endMinute: customSchedule.endMinute,
    });
  };

  return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <CalendarCheckIcon className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Work Schedule & Salary</h2>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <EuroIcon className="text-gray-400 mr-2" size={16} />
            <span className="text-gray-600">Salary Amount</span>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <select
                  className="appearance-none border border-gray-300 rounded px-3 py-2 pr-8 w-32"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
              >
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
                <option>AUD (A$)</option>
                <option>CAD (C$)</option>
                <option>CHF (CHF)</option>
                <option>CNY (¥)</option>
                <option>INR (₹)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
            <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 flex-grow"
                value={salary}
                onChange={handleSalaryChange}
            />
          </div>
        </div>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            <input
                type="radio"
                name="period"
                checked={period === 'monthly'}
                onChange={() => setPeriod('monthly')}
                className="mr-2"
            />
            <span>Monthly</span>
          </label>
          <label className="flex items-center">
            <input
                type="radio"
                name="period"
                checked={period === 'yearly'}
                onChange={() => setPeriod('yearly')}
                className="mr-2"
            />
            <span>Yearly</span>
          </label>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <ClockIcon className="text-gray-400 mr-2" size={16} />
            <span className="text-gray-600">Work Hours</span>
          </div>
          <div className="flex space-x-2 mb-4">
            <button
                className={`px-4 py-2 rounded font-medium ${
                    !isCustomMode ? 'bg-gray-100' : 'text-gray-600'
                }`}
                onClick={() => setIsCustomMode(false)}
            >
              Presets
            </button>
            <button
                className={`px-4 py-2 rounded ${
                    isCustomMode ? 'bg-gray-100' : 'text-gray-600'
                }`}
                onClick={() => setIsCustomMode(true)}
            >
              Custom
            </button>
          </div>
          {!isCustomMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workSchedules.map((schedule, index) => (
                    <div
                        key={index}
                        className={`border border-gray-200 rounded p-3 cursor-pointer ${
                            activeSchedule?.label === schedule.label ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setActiveSchedule(schedule)}
                    >
                      <div className="font-medium">{schedule.label}</div>
                      <div className="text-sm text-gray-500">
                        {formatTime(schedule.startHour, schedule.startMinute)} -{' '}
                        {formatTime(schedule.endHour, schedule.endMinute)}
                      </div>
                    </div>
                ))}
              </div>
          ) : (
              <div className="border border-gray-200 rounded p-4">
                <h3 className="font-medium mb-3">Custom Work Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <div className="flex space-x-2">
                      <select
                          className="border border-gray-300 rounded px-2 py-1 w-16"
                          value={customSchedule.startHour}
                          onChange={(e) =>
                              setCustomSchedule({
                                ...customSchedule,
                                startHour: parseInt(e.target.value),
                              })
                          }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                        ))}
                      </select>
                      <select
                          className="border border-gray-300 rounded px-2 py-1 w-16"
                          value={customSchedule.startMinute}
                          onChange={(e) =>
                              setCustomSchedule({
                                ...customSchedule,
                                startMinute: parseInt(e.target.value),
                              })
                          }
                      >
                        {[0, 15, 30, 45].map((minute) => (
                            <option key={minute} value={minute}>
                              {minute.toString().padStart(2, '0')}
                            </option>
                        ))}
                      </select>
                      <select
                          className="border border-gray-300 rounded px-2 py-1 w-16"
                          value={customSchedule.startPeriod}
                          onChange={(e) =>
                              setCustomSchedule({
                                ...customSchedule,
                                startPeriod: e.target.value as 'AM' | 'PM',
                              })
                          }
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <div className="flex space-x-2">
                      <select
                          className="border border-gray-300 rounded px-2 py-1 w-16"
                          value={customSchedule.endHour}
                          onChange={(e) =>
                              setCustomSchedule({
                                ...customSchedule,
                                endHour: parseInt(e.target.value),
                              })
                          }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                        ))}
                      </select>
                      <select
                          className="border border-gray-300 rounded px-2 py-1 w-16"
                          value={customSchedule.endMinute}
                          onChange={(e) =>
                              setCustomSchedule({
                                ...customSchedule,
                                endMinute: parseInt(e.target.value),
                              })
                          }
                      >
                        {[0, 15, 30, 45].map((minute) => (
                            <option key={minute} value={minute}>
                              {minute.toString().padStart(2, '0')}
                            </option>
                        ))}
                      </select>
                      <select
                          className="border border-gray-300 rounded px-2 py-1 w-16"
                          value={customSchedule.endPeriod}
                          onChange={(e) =>
                              setCustomSchedule({
                                ...customSchedule,
                                endPeriod: e.target.value as 'AM' | 'PM',
                              })
                          }
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleCustomScheduleSave}
                >
                  Save Custom Schedule
                </button>
              </div>
          )}
        </div>
      </div>
  );
};

export default WorkSchedule;