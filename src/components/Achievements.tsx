import React from 'react';
import { TrophyIcon, CalendarIcon, DollarSignIcon, ClockIcon, BookmarkIcon } from 'lucide-react';
import { useSalary } from '../contexts/SalaryContext';

const Achievements: React.FC = () => {
  const { achievements } = useSalary();

  const getIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return <CalendarIcon size={20} className="text-gray-500" />;
      case 'dollar':
        return <DollarSignIcon size={20} className="text-gray-500" />;
      case 'clock':
        return <ClockIcon size={20} className="text-gray-500" />;
      case 'bookmark':
        return <BookmarkIcon size={20} className="text-gray-500" />;
      default:
        return <CalendarIcon size={20} className="text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-6">
          <TrophyIcon className="text-yellow-500 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Achievements</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
              <div
                  key={achievement.id}
                  className={`flex items-center p-3 rounded-lg ${
                      achievement.completed
                          ? 'bg-gray-50 border-2 border-yellow-300'
                          : 'bg-gray-50'
                  }`}
              >
                <div
                    className={`${
                        achievement.completed ? 'bg-yellow-200' : 'bg-gray-200'
                    } p-2 rounded-full mr-3`}
                >
                  {achievement.completed ? (
                      <div
                          className={`${
                              achievement.icon === 'dollar'
                                  ? 'text-yellow-600'
                                  : achievement.icon === 'calendar'
                                      ? 'text-blue-600'
                                      : achievement.icon === 'clock'
                                          ? 'text-purple-600'
                                          : 'text-green-600'
                          }`}
                      >
                        {getIcon(achievement.icon)}
                      </div>
                  ) : (
                      getIcon(achievement.icon)
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  {achievement.completed ? (
                      <p className="text-sm text-green-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        Earned {formatDate(new Date())}
                      </p>
                  ) : (
                      <div>
                        <p className="text-sm text-gray-500">
                          {achievement.progress.toFixed(2)} /{' '}
                          {achievement.target.toFixed(2)} completed
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{
                                width: `${Math.min(
                                    100,
                                    (achievement.progress / achievement.target) * 100
                                ).toFixed(2)}%`,
                              }}
                          ></div>
                        </div>
                      </div>
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default Achievements;