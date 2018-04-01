import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-guestbook',
  templateUrl: './guestbook.component.html'
})
export class GuestBookComponent implements OnInit {
  ngOnInit(): void {
    // From instructions in Disqus documentation
    const d = document, s = d.createElement('script');
    s.src = '//davidmiles.disqus.com/embed.js';
    s.setAttribute('data-timestamp', `${(+new Date())}`);
    (d.head || d.body).appendChild(s);
  }
}
