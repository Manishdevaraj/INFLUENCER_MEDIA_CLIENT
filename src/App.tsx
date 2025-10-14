//@ts-nocheck
import { useState } from "react"
import { ThemeProvider } from "./components/theme-provider"
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import { AuthPage } from "./components/auth-page"
import {  FirebaseProvider} from "./Service/Firebase.context.jsx"
import { InfluencerDashboard } from "./components/influencer-dashboard.js"
import { BrandDashboard } from "./components/brand-dashboard.js"
import { ConnectAccounts } from "./components/connect-accounts.js"
import { InfluencerReports } from "./components/influencer-reports.js"
import { SettingsPage } from "./components/settings-page.js"
import InstagramStatus from "./components/ConnectionDialog/Instagram.js"
        
import  ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  
  // const [userType, setUserType] = useState<'brand' | 'influencer' | null>(null)

  // const handleAuthSuccess = (type: 'brand' | 'influencer') => {
  //   setUserType(type)
  //   setCurrentPage(type === 'brand' ? 'brand-dashboard' : 'influencer-dashboard')
  // }

  // const handleLogout = () => {
  //   setUserType(null)
  //   setCurrentPage('home')
  // }

  // const handleNavigate = (page: string) => {
  //   setCurrentPage(page as AppState)
  // }

  // const handleBackToDashboard = () => {
  //   if (userType === 'brand') {
  //     setCurrentPage('brand-dashboard')
  //   } else if (userType === 'influencer') {
  //     setCurrentPage('influencer-dashboard')
  //   }
  // }

  return (
       <FirebaseProvider>
    <ThemeProvider>

     
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/auth" element={<AuthPage />} />

  {/* All protected routes go under this route */}
  <Route element={<ProtectedRoute />}>
    <Route path="/brand-dashboard" element={<BrandDashboard />} />
    <Route path="/influencer-dashboard" element={<InfluencerDashboard />} />
    <Route path="/connect-accounts" element={<ConnectAccounts />} />
    <Route path="/influencer-reports" element={<InfluencerReports />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/instagram-status" element={<InstagramStatus />} />
  </Route>
</Routes>

      {/* <div className="min-h-screen bg-background text-foreground">
        {currentPage === 'home' && (
          1<>
            <Header onAuthClick={() => setCurrentPage('auth')} />
            <main>
              <HeroSection onAuthClick={() => setCurrentPage('auth')} />
              <AboutSection onAuthClick={() => setCurrentPage('auth')} />
              <FeaturesSection />
              <StatsSection />
            </main>
            <Footer />
          </>
        )}

        {currentPage === 'auth' && (
         1 <AuthPage 
            onBack={() => setCurrentPage('home')} 
            onAuthSuccess={handleAuthSuccess}
          />
        )}

        {currentPage === 'influencer-dashboard' && (
          1<InfluencerDashboard onLogout={handleLogout} onNavigate={handleNavigate} />
        )}

        {currentPage === 'brand-dashboard' && (
          1<BrandDashboard onLogout={handleLogout} onNavigate={handleNavigate} />
        )}

        {currentPage === 'campaign-creation' && (
          <CampaignCreation onBack={handleBackToDashboard} />
        )}

        {currentPage === 'influencer-reports' && (
          1<InfluencerReports onBack={handleBackToDashboard} />
        )}

        {currentPage === 'settings' && userType && (
          <SettingsPage userType={userType} onBack={handleBackToDashboard} />
        )}

        {currentPage === 'connect-accounts' && (
          1<ConnectAccounts onBack={handleBackToDashboard} />
        )}
      </div> */}
    </ThemeProvider>
      </FirebaseProvider>

  )
}