import { BookmarkCategory } from './types';

export const bookmarksData: BookmarkCategory[] = [
  {
    id: 'work',
    name: 'Work',
    bookmarks: [
      { id: 'eg-ai-chat', title: 'EG AI Chat', url: 'https://aichat.e-gineering.com' },
      { id: 'eg-librechat', title: 'EG LibreChat GitHub', url: 'https://github.com/e-gineering/LibreChat' },
      { id: 'timesheet', title: 'TimeSheet', url: 'https://time.e-gineering.com' },
      { id: 'dashboard', title: 'Dashboard', url: 'https://dashboard.e-gineering.com' },
      { id: 'e-gineering', title: 'E-gineering', url: 'http://www.e-gineering.com/' },
      { id: 'eg-site-dashboard', title: 'EG Site Dashboard', url: 'http://www.e-gineering.com/wp-admin' },
      { id: 'eg-stage', title: 'EG Stage', url: 'https://egwpstaging.wpengine.com/' },
      { id: 'jsm-portal', title: 'JSM Portal', url: 'https://e-gineering.atlassian.net/servicedesk/customer/portals' },
      { id: 'confluence', title: 'Confluence', url: 'https://e-gineering.atlassian.net/wiki/home' },
      { id: 'onedrive', title: 'OneDrive', url: 'https://egineering-my.sharepoint.com/personal/justin_dickey_e-gineering_com/_layouts/15/onedrive.aspx?view=0' },
      { id: 'sharefile', title: 'ShareFile', url: 'https://e-gineering.sharefile.com/dashboard' },
      { id: 'worksmart', title: 'Worksmart Portal', url: 'https://wsiee.prismhr.com/wsi' },
      { id: 'url-shortener', title: 'EG URL Shortener', url: 'https://u.eginc.io/' },
      { id: 'chatgpt', title: 'Chat GPT', url: 'https://chat.openai.com/' }
    ]
  },
  {
    id: 'sysadmin',
    name: 'Sys Admin',
    bookmarks: [
      { id: 'eg-service-desk', title: 'EG Service Desk', url: 'https://e-gineering.atlassian.net/jira/servicedesk/projects/EGSD/' },
      { id: 'egsys-board', title: 'EGSYS Board', url: 'https://e-gineering.atlassian.net/jira/software/c/projects/EGSYS/boards/229' },
      { id: 'slack-admin', title: 'Slack Admin', url: 'https://e-gineering.slack.com/admin' },
      { id: 'atlassian-admin', title: 'Atlassian Admin', url: 'https://admin.atlassian.com' },
      { id: 'azure-portal', title: 'Azure Portal', url: 'https://portal.azure.com/' },
      { id: 'office-portal', title: 'Microsoft Office Portal', url: 'https://admin.microsoft.com/AdminPortal/Home' },
      { id: 'exchange-admin', title: 'Exchange Admin Portal', url: 'https://admin.exchange.microsoft.com/#/' },
      { id: 'feenics', title: 'Feenics', url: 'https://keep.feenicshosting.com/dashboard' },
      { id: 'jll-requests', title: 'JLL Requests', url: 'https://connect.buildingengines.com/' },
      { id: 'engineer-of-day', title: 'E-gineer of the Day', url: 'https://docs.google.com/spreadsheets/d/1_-g8cdtYRNBKODkopYrviepSSPuksaxMFamxk_QSzrs/edit#gid=0' },
      { id: 'asset-movement', title: 'Asset Movement Form', url: 'https://forms.monday.com/forms/246d7e4d8e718140927c93f7e988d4f9?r=use1' },
      { id: 'monday', title: 'Monday', url: 'https://e-gineering.monday.com/my_work' }
    ]
  },
  {
    id: 'homelab',
    name: 'Home Lab',
    bookmarks: [
      { id: 'proxmox', title: 'Proxmox', url: 'http://192.168.0.167:8006/' },
      { id: 'homarr', title: 'Homarr', url: 'http://192.168.0.88:7575/' },
      { id: 'plex', title: 'Plex', url: 'http://192.168.0.88:32400/' },
      { id: 'erisdor-chat', title: 'Erisdor Chat', url: 'http://aichat.erisdor.com' },
      { id: 'tortuga-hub', title: 'Tortuga Media Hub', url: 'https://tortugamediahub.com' },
      { id: 'arch-wiki', title: 'Arch Wiki', url: 'https://wiki.archlinux.org/' },
      { id: 'unixporn', title: 'r/unixp*rn', url: 'https://www.reddit.com/r/unixporn/' },
      { id: 'hyprland-wiki', title: 'Hyprland Wiki', url: 'https://wiki.hyprland.org/' }
    ]
  },
  {
    id: 'general',
    name: 'General',
    bookmarks: [
      { id: 'reddit', title: 'Reddit', url: 'https://reddit.com' },
      { id: 'github', title: 'GitHub', url: 'https://github.com' },
      { id: 'gmail', title: 'Gmail', url: 'https://gmail.com' },
      { id: 'outlook', title: 'Outlook', url: 'https://outlook.office.com' },
      { id: 'chase', title: 'Chase', url: 'https://www.chase.com' },
      { id: 'youtube', title: 'YouTube', url: 'https://www.youtube.com' },
      { id: 'amazon', title: 'Amazon', url: 'https://smile.amazon.com' },
      { id: 'coffee', title: 'Coffee', url: 'https://www.mistobox.com/dashboard/' },
      { id: 'caliber', title: 'Caliber Home Loans', url: 'https://myaccount.caliberhomeloans.com/dashboard' }
    ]
  }
];