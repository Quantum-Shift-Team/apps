import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
            <p className="text-gray-600 mt-2">프로젝트 현황과 주요 지표를 확인하세요</p>
          </div>
          <Button size="lg">
            <span className="font-tossface mr-2">➕</span>
            새 프로젝트
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">전체 프로젝트</CardTitle>
              <span className="font-tossface text-xl">🚀</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <p className="text-xs text-green-600 mt-1">
                <span className="font-tossface">📈</span> +2 이번 주
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">완료된 작업</CardTitle>
              <span className="font-tossface text-xl">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">48</div>
              <p className="text-xs text-green-600 mt-1">
                <span className="font-tossface">📈</span> +12 이번 주
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">팀 멤버</CardTitle>
              <span className="font-tossface text-xl">👥</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <p className="text-xs text-blue-600 mt-1">
                <span className="font-tossface">👋</span> +1 이번 주
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">진행률</CardTitle>
              <span className="font-tossface text-xl">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">78%</div>
              <p className="text-xs text-green-600 mt-1">
                <span className="font-tossface">📈</span> +5% 이번 주
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 최근 활동 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>최근 프로젝트</CardTitle>
              <CardDescription>최근에 업데이트된 프로젝트 목록입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Quantum Shift v2.0', status: '진행중', progress: 85, color: 'bg-blue-500' },
                  { name: 'AI Dashboard', status: '리뷰중', progress: 60, color: 'bg-yellow-500' },
                  { name: 'Mobile App', status: '완료', progress: 100, color: 'bg-green-500' },
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-500">{project.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{project.progress}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${project.color}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>팀 활동</CardTitle>
              <CardDescription>최근 팀원들의 활동 내역입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: '김영진', action: '새 작업을 생성했습니다', time: '5분 전', icon: '➕' },
                  { name: '박민수', action: '프로젝트를 완료했습니다', time: '1시간 전', icon: '✅' },
                  { name: '이지은', action: '코드 리뷰를 완료했습니다', time: '2시간 전', icon: '👀' },
                  { name: '정현우', action: '새 이슈를 보고했습니다', time: '3시간 전', icon: '🐛' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-tossface text-sm">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}