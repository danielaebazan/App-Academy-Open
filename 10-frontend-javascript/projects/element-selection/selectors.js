const select = () => {
    /* Write queries for each of the following */

    /* Section 1 */
    // 1. Get all seeded fruit elements
const seededFruits = document.querySelectorAll('.seed');
    
    // 2. Get all seedless fruit elements
 const seedlessFruits = document.querySelectorAll('.seedless')

    // 3. Get first seedless fruit element
const firstSeedlessFruit = document.querySelector('.seedless')

    /* Section 2 */
    // 4. Get inner span with text "you"
const innerSpan = document.querySelector('#wrapper span')

    // 5. Get all children of element "wrapper"
const wrapperChildren = document.querySelector('#wrapper').children;

    // 6. Get all odd number list items in the list
const oddListItems = document.querySelectorAll('li.odd');

    // 7. Get all even number list items in the list
const evenListItems = document.querySelectorAll('li:not(.odd)');

    /* Section 3 */
    // 8. Get all tech companies without a class name
 const techCompanies = document.querySelectorAll('a:not([class])')

    // 9. Get "Amazon" list element
const amazonListItem = document.querySelector('a.shopping');

    // 10. Get all unicorn list elements (not the image element)
const unicornListElements = document.querySelectorAll('li:not(:has(img))');


console.log('Seeded fruits:', seededFruits);
console.log('Seedless fruits:', seedlessFruits);
console.log('First seedless fruit:', firstSeedlessFruit);
console.log('Inner span:', innerSpan);
console.log('Wrapper children:', wrapperChildren);
console.log('Odd list items:', oddListItems);
console.log('Even list items:', evenListItems);
console.log('Tech companies:', techCompanies);
console.log('Amazon list element:', amazonListItem);
console.log('Unicorn list elements:', unicornListElements);

}

window.onload = select;
