'use client'

import { useState, useEffect } from 'react'

interface BannerData {
  id: number
  title: string
  description: string
  type: 'promotion' | 'announcement' | 'event'
  color: string
  icon: string
}

export function DynamicBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const banners: BannerData[] = [
    {
      id: 1,
      title: '신규 가입자 50% 할인',
      description: '지금 가입하면 첫 달 요금 50% 할인!',
      type: 'promotion',
      color: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
      icon: '🎉'
    },
    {
      id: 2,
      title: '새로운 기능 출시',
      description: 'AI 기반 프로젝트 관리 기능이 추가되었습니다',
      type: 'announcement',
      color: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200',
      icon: '🚀'
    },
    {
      id: 3,
      title: '서버 점검 안내',
      description: '12월 15일 오전 2시-4시 서버 점검 예정',
      type: 'announcement',
      color: 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200',
      icon: '⚡'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => {
        if (prev === banners.length - 1) {
          // 마지막 배너에서 첫 번째로 이동
          return prev + 1 // 복제된 배너로 이동
        }
        return prev + 1
      })
    }, 5000) // 5초마다 변경

    return () => clearInterval(timer)
  }, [banners.length])

  useEffect(() => {
    // 복제된 배너(인덱스 3)에 도달하면 애니메이션 후 첫 번째로 리셋
    if (currentBanner === banners.length) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentBanner(0)
        setTimeout(() => {
          setIsTransitioning(true)
        }, 50)
      }, 500) // 애니메이션 시간과 동일
    }
  }, [currentBanner, banners.length])

  const displayBannerIndex = currentBanner >= banners.length ? 0 : currentBanner
  const displayedBanners = [...banners, banners[0]] // 첫 번째 배너를 끝에 복제

  return (
    <div className={`w-full ${banners[displayBannerIndex].color} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-hidden h-[42px] relative">
        {/* 슬라이딩 컨테이너 */}
        <div 
          className={isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}
          style={{ transform: `translateY(-${currentBanner * 42}px)` }}
        >
          {displayedBanners.map((banner, index) => (
            <div key={`${banner.id}-${index}`} className="h-[42px] flex items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <span className="font-tossface text-sm">{banner.icon}</span>
                  <div>
                    <span className="font-semibold text-gray-800 text-xs md:text-sm">
                      {banner.title}
                    </span>
                    <p className="text-gray-600 text-[10px] md:text-xs">
                      {banner.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1.5">
                  {/* 배너 인디케이터 */}
                  <div className="flex space-x-1">
                    {banners.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          idx === displayBannerIndex ? 'bg-gray-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
