import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  DecksPage,
  HomePage,
  CardsPage,
  ManageCards,
  StudyNow
} from '../../Routes'
import SettingsPage from '../../Routes/CardsPage/SettingsPage'
import LoginPage from '../../Routes/LoginPage'
import ProtectedPage from '../ProtectedPage'

const PageRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedPage />}>
        <Route path="/decks" element={<DecksPage />}></Route>
        <Route path="/decks/:id" element={<CardsPage />}>
          <Route path="dashboard" element={<div>Dashboard</div>}></Route>
          <Route path="study-now" element={<StudyNow />}></Route>
          <Route path="manage-cards" element={<ManageCards />}></Route>
          <Route path="configuration" element={<SettingsPage />}></Route>
        </Route>
      </Route>

      <Route path="*" element={<div>404 Not Found</div>}></Route>
    </Routes>
  )
}

export default PageRoutes
