# TODO: Fix Antivirus License Status Display in Machine Cards

## Steps to Complete

- [ ] Add `antVirusStatus` field to Machine interface in `src/types/machine.ts`
- [ ] Modify `src/pages/MachinesPage.tsx` to fetch antivirus licenses and compute status for each machine
- [ ] Update `src/components/MachineCard.tsx` to display `antVirusStatus` instead of `antVirusLicense`
- [x] Test the application to ensure statuses are displayed correctly

## Details

1. **Machine Interface Update**: Add `antVirusStatus?: string;` to the Machine type to hold the computed status ('ativo' or 'inativo').

2. **MachinesPage Enhancement**: 
   - Import `getAllLicenses` from license service
   - Fetch licenses in the `fetchMachines` function
   - Map over machines to find matching license by `keyLisence === machine.antVirusLicense`
   - Set `antVirusStatus` to license.status or 'inativo' if no match

3. **MachineCard Update**: Change the display from `{machine.antVirusLicense}` to `{machine.antVirusStatus || 'Sem Licença'}`

4. **Testing**: Run the app and verify that machine cards show correct license statuses.
