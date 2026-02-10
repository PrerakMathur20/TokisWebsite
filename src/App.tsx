import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@synu/react';

import { DocsLayout, LandingLayout } from './components/SiteLayout';
import { Landing } from './pages/Landing';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AboutPage } from './pages/AboutPage';
import { IntroductionPage } from './pages/docs/IntroductionPage';
import { InstallationPage } from './pages/docs/InstallationPage';
import { ThemingPage } from './pages/docs/ThemingPage';
import { ButtonPage } from './pages/docs/ButtonPage';
import { TypographyPage } from './pages/docs/TypographyPage';
import { TextFieldPage } from './pages/docs/TextFieldPage';
import { CheckboxPage } from './pages/docs/CheckboxPage';
import { RadioPage } from './pages/docs/RadioPage';
import { SelectPage } from './pages/docs/SelectPage';
import { SwitchPage } from './pages/docs/SwitchPage';
import { SliderPage } from './pages/docs/SliderPage';
import { CardPage } from './pages/docs/CardPage';
import { LayoutPage } from './pages/docs/LayoutPage';
import { AvatarPage } from './pages/docs/AvatarPage';
import { BadgePage } from './pages/docs/BadgePage';
import { ChipPage } from './pages/docs/ChipPage';
import { AlertPage } from './pages/docs/AlertPage';
import { ProgressPage } from './pages/docs/ProgressPage';
import { DialogPage } from './pages/docs/DialogPage';
import { AccordionPage } from './pages/docs/AccordionPage';
import { TabsPage } from './pages/docs/TabsPage';
import { TooltipPage } from './pages/docs/TooltipPage';
import { TablePage } from './pages/docs/TablePage';
import { SnackbarPage } from './pages/docs/SnackbarPage';
import { BreadcrumbsPage } from './pages/docs/BreadcrumbsPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Docs */}
          <Route path="/docs" element={<DocsLayout />}>
            {/* Getting Started */}
            <Route index element={<Navigate to="/docs/introduction" replace />} />
            <Route path="introduction" element={<IntroductionPage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="theming" element={<ThemingPage />} />

            {/* Foundations */}
            <Route path="typography" element={<TypographyPage />} />
            <Route path="layout" element={<LayoutPage />} />

            {/* Components */}
            <Route path="button" element={<ButtonPage />} />
            <Route path="avatar" element={<AvatarPage />} />
            <Route path="badge" element={<BadgePage />} />
            <Route path="chip" element={<ChipPage />} />
            <Route path="card" element={<CardPage />} />

            {/* Forms */}
            <Route path="input" element={<TextFieldPage />} />
            <Route path="textfield" element={<TextFieldPage />} />
            <Route path="checkbox" element={<CheckboxPage />} />
            <Route path="radio" element={<RadioPage />} />
            <Route path="select" element={<SelectPage />} />
            <Route path="switch" element={<SwitchPage />} />
            <Route path="slider" element={<SliderPage />} />

            {/* Feedback */}
            <Route path="alert" element={<AlertPage />} />
            <Route path="feedback" element={<ProgressPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="snackbar" element={<SnackbarPage />} />

            {/* Navigation */}
            <Route path="breadcrumbs" element={<BreadcrumbsPage />} />
            <Route path="tabs" element={<TabsPage />} />
            <Route path="menu" element={<TooltipPage />} />

            {/* Overlay */}
            <Route path="dialog" element={<DialogPage />} />
            <Route path="drawer" element={<DialogPage />} />
            <Route path="tooltip" element={<TooltipPage />} />
            <Route path="popover" element={<TooltipPage />} />

            {/* Interactive */}
            <Route path="accordion" element={<AccordionPage />} />
            <Route path="table" element={<TablePage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/docs/introduction" replace />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
