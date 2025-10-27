"use client";

import React, { useState, useEffect } from 'react';

interface TimeIntervalSelectorProps {
  onIntervalChange: (interval: string) => void;
  defaultInterval?: string;
}

export function TimeIntervalSelector({ 
  onIntervalChange, 
  defaultInterval = "5" 
}: TimeIntervalSelectorProps) {
  const [selectedInterval, setSelectedInterval] = useState<string>(defaultInterval || '15');
  const [isMounted, setIsMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('15');
  const [lastSelectedSubInterval, setLastSelectedSubInterval] = useState<'1' | '3' | '5' | '15'>('15');

  useEffect(() => {
    setIsMounted(true);
  }, [defaultInterval]);

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
    onIntervalChange(interval);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    
    // 해당 카테고리에 해당하는 인터벌로 바로 변경
    if (category === '15') {
      handleIntervalChange('15');
    } else if (category === '30') {
      handleIntervalChange('30');
    } else if (category === '60') {
      handleIntervalChange('60');
    } else if (category === '240') {
      handleIntervalChange('240');
    }
  };

  const handleSubIntervalClick = (interval: '1' | '3' | '5' | '15') => {
    setLastSelectedSubInterval(interval);
    handleIntervalChange(interval);
    closeSheet();
  };

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSheetOpen(false);
      setIsClosing(false);
    }, 300);
  };



  // 클라이언트 사이드에서만 렌더링하여 hydration 오류 방지
  if (!isMounted) {
    return (
      <div className="flex gap-2 p-3 bg-gray-800 rounded-lg">
        <div className="px-3 py-2 text-sm font-medium rounded-md bg-gray-700 text-gray-300">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 메인 버튼들 */}
      <div className="flex justify-between px-4 gap-2">
        {/* 15분봉 버튼 */}
        <button
          onClick={() => {
            if (selectedCategory === '15') {
              openSheet();
            } else {
              setSelectedCategory('15');
              handleIntervalChange(lastSelectedSubInterval);
            }
          }}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedCategory === '15' && ['1', '3', '5', '15'].includes(selectedInterval)
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <span>{lastSelectedSubInterval}분</span>
            <svg 
              className="w-3 h-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </button>

        {/* 30분봉 버튼 */}
        <button
          onClick={() => handleCategoryClick('30')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === '30'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          30분
        </button>

        {/* 60분봉 버튼 */}
        <button
          onClick={() => handleCategoryClick('60')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === '60'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          60분
        </button>

        {/* 240분봉 버튼 */}
        <button
          onClick={() => handleCategoryClick('240')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === '240'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          240분
        </button>

        {/* 일봉 버튼 */}
        <button
          onClick={() => handleIntervalChange('D')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === 'D'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          일봉
        </button>
      </div>

      {/* 하단 시트 */}
      {isSheetOpen && (
        <>
          {/* 시트 */}
          <div className={`fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-lg z-50 p-3 shadow-2xl m-0 ${isClosing ? 'slide-down-animation' : 'slide-up-animation'}`}>
            <div className="flex justify-center mb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
            </div>
            
            <h3 className="text-sm font-semibold text-white mb-2 text-center">분봉 선택</h3>
            
            <div className="grid grid-cols-3 gap-2">
              {['1', '3', '5', '15'].map((minute) => (
                <button
                  key={minute}
                  onClick={() => handleSubIntervalClick(minute as '1' | '3' | '5' | '15')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                    selectedInterval === minute
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {minute}분
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}