import { Injectable } from '@angular/core';
import { Tag } from '../model/tag';
import { TagCheckbox } from '../model/tag';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

    tagList: Tag[];
    tagMap: Map<string, TagCheckbox> = new Map<string, TagCheckbox>();

    private resetTagMap() {
        for ( const t of this.tagList) {
            this.tagMap.set(t.key, new TagCheckbox(t));
        }
         console.log('Added tagCheckbox: ' + this.tagMap.size);
    }
    
    setTags(tags) { 
        this.tagList = tags;
        this.resetTagMap();
    }

    getTags() { return this.tagList; }
    // getTagCheckboxMap() { return this.tagMap; }

    getTagCheckboxMap(selectedTags: Tag[]) {
        this.resetTagMap();
        console.log('Getting tagCheckbox: ' + this.tagMap.size);
        const cbMap = new Map(this.tagMap);                     // You would think this created a new object, but apparently it does not.  Thus resetTagMap() was called.
        if ( selectedTags != null ) {
                for ( const t of selectedTags ) {
                    cbMap.get(t.key).checked = true;
                }
            }
            return cbMap;
    }

}
