import { Injectable } from '@angular/core';

import { PanelItemWebsiteComponent } from './panel-item-website/panel-item-website.component';
import { PanelItemImageComponent } from './panel-item-image/panel-item-image.component';
import { PanelItemPhotoComponent } from './panel-item-photo/panel-item-photo.component';
import { PanelItemMiniComponent } from './panel-item-mini/panel-item-mini.component';
import { PanelItem } from './panel-item';
import { Uuid } from './Util';

@Injectable()
export class PanelService {
  getPanels() {
    return [
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: AquaCheck TruTest', title: 'AquaCheck TruTest', url: 'http://www.aquachek.com/', technology: 'ASP, Adobe Photoshop, Adobe Animate, JavaScript, Microsoft SQL Server, HTML5, CSS3', body: 'AquaChek is one of many Danaher product lines. I developed all of the site graphics, including an interactive handheld, that would animate on its own or when prompted-- teaching the user about the device.', image: '/assets/image/web-trutest.jpg', imageSize: 'cover', imagePosition: 'left top', imagePositionLarge: 'left top', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: Stores', title: 'Stores', url: 'https://stores.lowbob.com/', technology: 'Angular 15, Adobe Photoshop 2023, Adobe Illustrator 2023, SVGator, HTML5, CSS3', body: 'A store chain data management app. Made with Angular 15 and uses a .NET Core WebApi for data exhange (that I also built). A user can build or create any type of object. Whether it be a store asset, employee, or a property that describes an object. Fully dynamic, and flexible.', image: '/assets/image/web-stores.jpg', imageSize: 'cover', imagePosition: '55% top', imagePositionLarge: 'center top', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: QA', title: 'QA', url: 'https://qa.richmondmaster.com/', technology: 'Angular 15, Adobe Photoshop 2023, Adobe Illustrator 2023, SVGator, HTML5, CSS3', body: 'A knowledgebase and question/answer site. Made with Angular 15 and uses a .NET Core WebApi for data exhange (that I also built). A user can add their knowledge to this system for other company users to see and use to learn or solve a problem.', image: '/assets/image/web-qa.jpg', imageSize: 'cover', imagePosition: '55% top', imagePositionLarge: 'center top', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: Low Bob\'s Workplace', title: 'Low Bob\'s Workplace', url: 'https://workplace.lowbob.com/', technology: 'Angular 15, Adobe Photoshop 2023, Adobe Illustrator 2023, SVGator, HTML5, CSS3', body: 'Low Bob\'s is a convenience store chain that needed an employee work site; offering tools for productivity. The site was built with Angular 15 and has a .Net Core WebAPI that it calls for content. I created all design work (except the characters) via Photoshop and Illustrator.', image: '/assets/image/web-workplace.jpg', imageSize: 'cover', imagePosition: 'left top', imagePositionLarge: 'center top', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: DataHub', title: 'Data Hub', url: 'https://datahub.richmondmaster.com/', technology: 'Angular 15, Adobe Photoshop 2023, Adobe Illustrator 2023, SVGator, HTML5, CSS3', body: 'A cloud data retrieval tool, mainly to access data from Altria and internal data sets. Configurable to pull any data with any parameter. The site was built with Angular 15 and has a .Net Core WebAPI that it calls for content.', image: '/assets/image/web-datahub.jpg', imageSize: 'cover', imagePosition: 'left top', imagePositionLarge: 'center top', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: OrderLink', title: 'OrderLink', url: 'https://customer.richmondmaster.com/', technology: 'AngularJS, ASP.Net, C#, Microsoft Dynamics NAV 2016, Microsoft SQL Server 2016, RDLs, Adobe Photoshop 2022, Adobe Illustrator 2022, SVGator, HTML5, CSS3', body: 'A single page applcation (SPA) built with Angular; with .NET as the server-side processing, which integrate with Microsoft Dynamics NAV datasets. The ordering page is for B2B ordering, reporting, and analytics. Orders are picked and fulfilled at an on-site warehouse.', image: '/assets/image/web-orderlink.jpg', imageSize: 'cover', imagePosition: '', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: The Club Mauna Kea', title: 'The Club Mauna Kea', url: 'https://www.theclubmaunakea.com/', technology: 'ASP.Net, C#, JavaScript, JQuery, Microsoft Dynamics, Photoshop, HTML5, CSS3', body: 'A membership site for Mauna Kea Resort. I had created a mockup in Photoshop, then converted that to a working membership web site in ASP.Net with C#. The site integrates with Microsoft Dynamics.', image: '/assets/image/web-tc.jpg', imageSize: 'cover', imagePosition: '', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: Prince Preferred', title: 'Prince Preferred', url: 'https://www.princepreferred.com/', technology: 'ASP.Net, C#, JavaScript, JQuery, Microsoft Dynamics, Photoshop, HTML5, CSS3', body: 'Prince Preferred is a loyalty web site for Prince Resorts Hawaii; it allows guests to accumlate points and redeem those points via this web site. The site was built with ASP.NET/C#. Custom JQuery-based plugins were built for display of content-- a tabbed box, and scroller. Enrollment, and point redemption is done through an on-prem Microsoft Dynamics backend.', image: '/assets/image/web-pp.jpg', imageSize: 'cover', imagePosition: '', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: Plumeria', title: 'Plumeria', url: 'https://travelagents.princeresortshawaii.com/', technology: 'ASP.Net, C#, JavaScript, JQuery, Microsoft Dynamics, Photoshop, HTML5, CSS3', body: 'A travel agents loyalty web site for Prince Resorts Hawaii. It allows travel agents to use point to make reservations for their guests. The site was built with ASP.Net/C#, and JQuery.', image: '/assets/image/web-plum.jpg', imageSize: '', imagePosition: '', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'web'
      ),
      new PanelItem(
        PanelItemWebsiteComponent,
        { id: Uuid.create(), headline: 'Website: United Way of Metropolitan Chicago', title: 'United Way of Metropolitan Chicago', url: '', technology: 'PHP, Wordpress, MySQL, HTML5, CSS3, Adobe Animate, Adobe Photoshop', body: 'I did not build the Wordpress site, though I maintained content, made code changes, and built animations using Adobe Animate.', image: '/assets/image/web-unitedway.jpg', imageSize: 'cover', imagePosition: 'right top', imagePositionLarge: 'right top', imagePositionMobile: '', imagePositionMobileLarge: 'right top' },
        'web'
      ),
      new PanelItem(
        PanelItemImageComponent ,
        { id: Uuid.create(), headline: 'Mailer: 100 Sails Restaurant', title: '100 Sails Restaurant', url: '', technology: 'Adobe Photoshop CC, HTML5, CSS3', body: 'This is a mailer that I had built using Photoshop; then converted into HTML that was compatible for doing a mass emailing campaign.', image: '/assets/image/image-100sails.jpg', imageSize: 'cover', imagePosition: 'top center', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'image'
      ),
      new PanelItem(
        PanelItemImageComponent ,
        { id: Uuid.create(), headline: 'Mailer: Prince Waikiki - Evolution', title: 'Prince Waikiki - Evolution', url: '', technology: 'Adobe Photoshop CC, HTML5, CSS3', body: 'This is another mailer to promote the renovations to the Prince Waikiki hotel. This was a long high-res composition built with Photoshop; then converted to HTML5 and CSS3 as an email piece.', image: '/assets/image/image-hphw.jpg', imageSize: 'cover', imagePosition: 'top center', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'image'
      ),
      new PanelItem(
        PanelItemImageComponent ,
        { id: Uuid.create(), headline: 'Mailer: Mauna Kea Beach Hotel', title: 'Mauna Kea Beach Hotel', url: '', technology: 'Adobe Photoshop CC, HTML5, CSS3', body: 'This mailer was to advertise Mauna Kea Beach Hotel, and to drive reservations for what\'s called their Kama\'aina guests. Care was taken to make the mailer compatible with: Outlook desktop, Outlook online, GMail, and Android and iPhone built-in mail clients.', image: '/assets/image/image-mkbh.jpg', imageSize: 'cover', imagePosition: 'bottom center', imagePositionLarge: 'bottom center', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'image'
      ),
      new PanelItem(
        PanelItemImageComponent ,
        { id: Uuid.create(), headline: 'Print: Masterlink', title: 'Masterlink', url: 'https://customer.richmondmaster.com/', technology: 'Adobe Illustrator CC 2022', body: 'This was a completely vectorized design for print. It was for the launch of a reworked version of the Masterlink web site-- an order site for the company Richmond Master.', image: '/assets/image/image-masterlink.jpg', imageSize: 'cover', imagePosition: '', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'image'
      ),
      new PanelItem(
        PanelItemImageComponent ,
        { id: Uuid.create(), headline: 'Print: VoIP', title: 'VoIP startup', url: '', technology: 'Adobe Illustrator CC, Microsoft Word 365', body: 'A VoIP startup company had asked me to create a composition, for print, that outlined their product offerings. This was the result-- a vectorized design that was made editable via Microsoft Word (if desired), and readily exportable to PDF.', image: '/assets/image/image-voip.jpg', imageSize: 'cover', imagePosition: '', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'image'
      ),
      new PanelItem(
        PanelItemPhotoComponent ,
        { id: Uuid.create(), headline: 'PRODUCT', title: 'PRODUCT', url: '', technology: 'Canon 5D, 50mm 2.8f macro, natural light', body: 'A product shot concept. Natural diffuse light. Taken with a 50mm f2.8 macro (1/2 lifesize).', image: '/assets/image/photo-sunglasses.jpg', imageSize: 'cover', imagePosition: '', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'photo'
      ),
      new PanelItem(
        PanelItemPhotoComponent ,
        { id: Uuid.create(), headline: 'LANDSCAPE', title: 'LANDSCAPE', url: '', technology: '-', body: '', image: '/assets/image/photo-mountains.jpg', imageSize: 'cover', imagePosition: 'center top', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'photo'
      ),
      new PanelItem(
        PanelItemPhotoComponent ,
        { id: Uuid.create(), headline: 'ARCHITECTURAL', title: 'ARCHITECTURAL', url: '', technology: 'Canon 5D, 15mm 2.8f ultra wide-angle', body: 'Architectural concept. Taken with a 15mm ultra-wideangle. Fullframe.', image: '/assets/image/photo-lighthouse.jpg', imageSize: 'cover', imagePosition: 'center top', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'photo'
      ),
      new PanelItem(
        PanelItemPhotoComponent ,
        { id: Uuid.create(), headline: 'LANDSCAPE', title: 'LANDSCAPE', url: '', technology: '-', body: '', image: '/assets/image/photo-donkey.jpg', imageSize: 'cover', imagePosition: 'center top', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'photo'
      ),
      new PanelItem(
        PanelItemPhotoComponent ,
        { id: Uuid.create(), headline: 'PRODUCT', title: 'PRODUCT', url: '', technology: 'Canon 5D, 50mm 2.8f macro, lightbox setup', body: 'A food shot concept for advertising. Lightboxed, and isolated. Taken with a 50mm f2.8 macro.', image: '/assets/image/photo-tart.jpg', imageSize: 'cover', imagePosition: 'center top', imagePositionLarge: '', imagePositionMobile: '', imagePositionMobileLarge: '' },
        'photo'
      ),
    ];
  }

  getPanelsMini() {
    return [
      new PanelItem(
        PanelItemMiniComponent,
        { id: Uuid.create(), headline: '', body: 'I develop sites and UI/UX using Angular 16, Vue, React, PHP, .Net Core., SQL/MySql/MariaDB' },
        ''
      ),
      new PanelItem(
        PanelItemMiniComponent ,
        { id: Uuid.create(), headline: '', body: 'This site-- and its controls-- were built with Angular 16.' },
        ''
      ),
      new PanelItem(
        PanelItemMiniComponent ,
        { id: Uuid.create(), headline: '', body: 'I\'m from the California Bay Area.' },
        ''
      ),
      new PanelItem(
        PanelItemMiniComponent ,
        { id: Uuid.create(), headline: '', body: 'This site uses a full custom CSS library that I built -- See the Git: g-greene/basecss' },
        ''
      ),
      new PanelItem(
        PanelItemMiniComponent ,
        { id: Uuid.create(), headline: '', body: 'Click the radial menu button at the top-right to see other content.' },
        ''
      ),
      new PanelItem(
        PanelItemMiniComponent ,
        { id: Uuid.create(), headline: '', body: 'Fun Fact: The site is Responsive; it will reshape itself according to screen size.' },
        ''
      ),
      new PanelItem(
        PanelItemMiniComponent ,
        { id: Uuid.create(), headline: '', body: 'Change colors using the color pucks below.' },
        ''
      )
    ];
  }
}
