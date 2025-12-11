/**
 * 인스타그램 인앱 브라우저 감지 함수
 * @returns 인스타그램 인앱 브라우저인지 여부
 */
export const isInstagramInAppBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent || window.navigator.vendor || (window as any).opera;
  
  // Instagram 인앱 브라우저 감지
  return /Instagram/i.test(userAgent);
};

/**
 * 외부 브라우저로 링크 열기 시도
 * 인스타그램 인앱 브라우저에서 외부 브라우저(사파리, 크롬 등)로 링크를 여는 함수
 * @param url 열고자 하는 URL
 * @returns 외부 브라우저 열기 시도 성공 여부
 */
export const openInExternalBrowser = (url: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  // iOS의 경우
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    // 외부 브라우저로 열기 시도
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    
    // iOS에서 외부 브라우저로 열기 시도
    const clickedEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    anchor.dispatchEvent(clickedEvent);
    
    // window.location을 통해 외부 브라우저로 열기 시도
    setTimeout(() => {
      window.location.href = url;
    }, 250);
    return true;
  }
  
  // Android의 경우
  if (/Android/.test(navigator.userAgent)) {
    // Intent URL 시도 (일부 앱에서 지원)
    try {
      window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
      return true;
    } catch {
      // 실패 시 일반 링크
      window.location.href = url;
      return true;
    }
  }
  
  // 기본적으로 새 탭에서 열기 시도
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
};

