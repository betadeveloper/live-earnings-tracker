import React, { useState, useEffect } from 'react';
import { CalculatorIcon, ClockIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { useSalary } from '../contexts/SalaryContext';

const AffordCalculator: React.FC = () => {
    const { wishlistItems, setWishlistItems, addWishlistItem, removeWishlistItem, currency } = useSalary();
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        category: 'Electronics',
    });

    useEffect(() => {
        const storedItems = localStorage.getItem('wishlistItems');
        if (storedItems) {
            setWishlistItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const handleAddItem = () => {
        if (newItem.name && newItem.price) {
            addWishlistItem({
                name: newItem.name,
                price: parseFloat(newItem.price),
                category: newItem.category,
            });
            setNewItem({
                name: '',
                price: '',
                category: 'Electronics',
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddItem();
        }
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm w-full max-w-[min(100%,640px)] mx-auto">
            <div className="flex items-center mb-4">
                <CalculatorIcon className="text-green-600 mr-2" size={24} />
                <h2 className="text-lg font-semibold">Time to Afford Calculator</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Item name"
                    className="border border-gray-300 rounded px-3 py-2 flex-grow w-full sm:w-auto"
                    value={newItem.name}
                    onChange={(e) =>
                        setNewItem({
                            ...newItem,
                            name: e.target.value,
                        })
                    }
                    onKeyPress={handleKeyPress}
                />
                <input
                    type="text"
                    placeholder="Price"
                    className="border border-gray-300 rounded px-3 py-2 w-full sm:w-32"
                    value={newItem.price}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        setNewItem({
                            ...newItem,
                            price: value,
                        });
                    }}
                    onKeyPress={handleKeyPress}
                />
                <div className="relative w-full sm:w-auto">
                    <select
                        className="appearance-none border border-gray-300 rounded px-3 py-2 pr-8 w-full sm:w-auto"
                        value={newItem.category}
                        onChange={(e) =>
                            setNewItem({
                                ...newItem,
                                category: e.target.value,
                            })
                        }
                    >
                        <option>Electronics</option>
                        <option>Travel</option>
                        <option>Clothing</option>
                        <option>Home</option>
                        <option>Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
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
                <button
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded w-full sm:w-auto"
                    onClick={handleAddItem}
                >
                    <PlusIcon size={20} />
                </button>
            </div>
            <div className="space-y-4">
                {wishlistItems.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded p-4 bg-gray-50"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-gray-500">
                                    {currency.match(/\((.*?)\)/)?.[1]} {item.price}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center text-blue-600">
                                    <ClockIcon size={16} className="mr-1" />
                                    <span>{item.daysToAfford.toFixed(2)} days</span>
                                </div>
                                <button
                                    className="text-red-500"
                                    onClick={() => removeWishlistItem(item.id)}
                                >
                                    <TrashIcon size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {wishlistItems.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                        No items added yet. Add something you want to save for!
                    </div>
                )}
            </div>
        </div>
    );
};

export default AffordCalculator;