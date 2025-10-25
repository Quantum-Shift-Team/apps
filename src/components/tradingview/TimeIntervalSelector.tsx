"use client";

import React, { useState, useEffect } from 'react';

interface TimeIntervalSelectorProps {
  onIntervalChange: (interval: string) => void;
  defaultInterval?: '1' | '3' | '5' | '10' | '15' | '30' | '60' | '120' | '240' | 'D' | 'W' | 'M' | 'Y';
}

export function TimeIntervalSelector({ 
  onIntervalChange, 
  defaultInterval = "5" 
}: TimeIntervalSelectorProps) {
  const [selectedInterval, setSelectedInterval] = useState<'1' | '3' | '5' | '10' | '15' | '30' | '60' | '120' | '240' | 'D' | 'W' | 'M' | 'Y'>(defaultInterval);
  const [isMounted, setIsMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [lastMinuteInterval, setLastMinuteInterval] = useState<'1' | '3' | '5' | '10' | '15'>('5');

  useEffect(() => {
    setIsMounted(true);
    
    // 기본값이 분봉인 경우 마지막 분봉 설정
    const minuteIntervals = ['1', '3', '5', '10', '15'];
    if (minuteIntervals.includes(defaultInterval)) {
      setLastMinuteInterval(defaultInterval as '1' | '3' | '5' | '10' | '15');
    }
  }, [defaultInterval]);

  const handleIntervalChange = (interval: '1' | '3' | '5' | '10' | '15' | '30' | '60' | '120' | '240' | 'D' | 'W' | 'M' | 'Y') => {
    setSelectedInterval(interval);
    onIntervalChange(interval);
  };

  const handleMinuteButtonClick = () => {
    const minuteIntervals = ['1', '3', '5', '10', '15'];
    const isCurrentlyMinute = minuteIntervals.includes(selectedInterval);
    
    if (isCurrentlyMinute) {
      // 이미 분봉이 선택된 상태: 시트 열기
      setIsSheetOpen(true);
    } else {
      // 다른 시간대가 선택된 상태: 마지막 분봉으로 변경
      handleIntervalChange(lastMinuteInterval);
    }
  };

  const handleMinuteSelect = (minute: '1' | '3' | '5' | '10' | '15') => {
    setLastMinuteInterval(minute); // 마지막 분봉 업데이트
    handleIntervalChange(minute);
    closeSheet();
  };

  const closeSheet = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSheetOpen(false);
      setIsClosing(false);
    }, 300); // 애니메이션 시간과 동일
  };

  const getMinuteDisplayText = () => {
    const minuteIntervals = ['1', '3', '5', '10', '15'];
    if (minuteIntervals.includes(selectedInterval)) {
      return `${selectedInterval}분`;
    }
    return `${lastMinuteInterval}분`;
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
      <div className="flex justify-between px-4">
        {/* 분봉 버튼 */}
        <button
          onClick={handleMinuteButtonClick}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            ['1', '3', '5', '10', '15'].includes(selectedInterval)
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            <span>{getMinuteDisplayText()}</span>
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

        {/* 일봉 버튼 */}
        <button
          onClick={() => handleIntervalChange('D')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === 'D'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          일
        </button>

        {/* 주봉 버튼 */}
        <button
          onClick={() => handleIntervalChange('W')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === 'W'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          주
        </button>

        {/* 월봉 버튼 */}
        <button
          onClick={() => handleIntervalChange('M')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === 'M'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          월
        </button>

        {/* 년봉 버튼 */}
        <button
          onClick={() => handleIntervalChange('Y')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
            selectedInterval === 'Y'
              ? 'bg-gray-600 text-white shadow-md'
              : 'text-gray-300'
          }`}
        >
          년
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
              {['1', '3', '5', '10', '15'].map((minute) => (
                <button
                  key={minute}
                  onClick={() => handleMinuteSelect(minute as '1' | '3' | '5' | '10' | '15')}
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