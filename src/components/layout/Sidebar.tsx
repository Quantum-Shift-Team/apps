'use client'

import { useState } from 'react'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className = '' }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: '📊',
      href: '#'
    },
    {
      id: 'projects',
      label: '프로젝트',
      icon: '🚀',
      href: '#'
    },
    {
      id: 'tasks',
      label: '작업',
      icon: '✅',
      href: '#'
    },
    {
      id: 'team',
      label: '팀',
      icon: '👥',
      href: '#'
    },
    {
      id: 'analytics',
      label: '분석',
      icon: '📈',
      href: '#'
    },
    {
      id: 'settings',
      label: '설정',
      icon: '⚙️',
      href: '#'
    }
  ]

  return (
    <aside className={`w-64 bg-gray-50 border-r border-gray-200 ${className}`}>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                setActiveItem(item.id)
              }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="font-tossface text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* 하단 섹션 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
            >
              <span className="font-tossface text-lg">❓</span>
              <span className="font-medium">도움말</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
            >
              <span className="font-tossface text-lg">💬</span>
              <span className="font-medium">피드백</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
