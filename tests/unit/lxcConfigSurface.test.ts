import { describe, it, expectTypeOf } from 'vitest';
import type { NodesAPI } from '../../src/api/nodes/types.js';

/**
 * Canary test for LXC config API surface.
 *
 * Ensures /nodes/{node}/lxc/{vmid}/config uses LXC-specific types
 * (not QEMU types). If this test compiles and passes, the LXC config
 * surface matches the Proxmox API.
 *
 * expectTypeOf assertions are type-checked at compile-time.
 */
describe('LXC config API surface', () => {
    type LxcConfig = NodesAPI['/nodes/{node}/lxc/{vmid}/config'];
    type GetReturn = LxcConfig['GET']['return'];
    type PutBody = LxcConfig['PUT']['parameters']['$body'];

    describe('GET return type has LXC-specific properties', () => {
        it('has digest as required string', () => {
            expectTypeOf<GetReturn>().toHaveProperty('digest');
            expectTypeOf<GetReturn['digest']>().toBeString();
        });

        it('has arch with LXC enum', () => {
            expectTypeOf<GetReturn>().toHaveProperty('arch');
        });

        it('has cmode', () => {
            expectTypeOf<GetReturn>().toHaveProperty('cmode');
        });

        it('has console as boolean', () => {
            expectTypeOf<GetReturn>().toHaveProperty('console').toBeBoolean();
        });

        it('has cores as number', () => {
            expectTypeOf<GetReturn>().toHaveProperty('cores').toBeNumber();
        });

        it('has cpulimit as number', () => {
            expectTypeOf<GetReturn>().toHaveProperty('cpulimit').toBeNumber();
        });

        it('has cpuunits as number', () => {
            expectTypeOf<GetReturn>().toHaveProperty('cpuunits').toBeNumber();
        });

        it('has mp[n] for mount points', () => {
            expectTypeOf<GetReturn>().toHaveProperty('mp[n]').toBeString();
        });

        it('has rootfs', () => {
            expectTypeOf<GetReturn>().toHaveProperty('rootfs').toBeString();
        });

        it('has ostype with LXC distros', () => {
            expectTypeOf<GetReturn>().toHaveProperty('ostype').toBeString();
        });

        it('has unprivileged as boolean', () => {
            expectTypeOf<GetReturn>().toHaveProperty('unprivileged').toBeBoolean();
        });

        it('has hostname', () => {
            expectTypeOf<GetReturn>().toHaveProperty('hostname').toBeString();
        });

        it('has nameserver', () => {
            expectTypeOf<GetReturn>().toHaveProperty('nameserver').toBeString();
        });

        it('has searchdomain', () => {
            expectTypeOf<GetReturn>().toHaveProperty('searchdomain').toBeString();
        });

        it('has swap as number', () => {
            expectTypeOf<GetReturn>().toHaveProperty('swap').toBeNumber();
        });

        it('has tty as number', () => {
            expectTypeOf<GetReturn>().toHaveProperty('tty').toBeNumber();
        });

        it('has timezone as string', () => {
            expectTypeOf<GetReturn>().toHaveProperty('timezone').toBeString();
        });

        it('has features', () => {
            expectTypeOf<GetReturn>().toHaveProperty('features').toBeString();
        });

        it('has entrypoint', () => {
            expectTypeOf<GetReturn>().toHaveProperty('entrypoint').toBeString();
        });

        it('has env', () => {
            expectTypeOf<GetReturn>().toHaveProperty('env').toBeString();
        });

        it('has hookscript', () => {
            expectTypeOf<GetReturn>().toHaveProperty('hookscript').toBeString();
        });

        it('has dev[n]', () => {
            expectTypeOf<GetReturn>().toHaveProperty('dev[n]').toBeString();
        });

        it('has net[n]', () => {
            expectTypeOf<GetReturn>().toHaveProperty('net[n]').toBeString();
        });

        it('has protection as boolean', () => {
            expectTypeOf<GetReturn>().toHaveProperty('protection').toBeBoolean();
        });

        it('has template as boolean', () => {
            expectTypeOf<GetReturn>().toHaveProperty('template').toBeBoolean();
        });

        it('has onboot as boolean', () => {
            expectTypeOf<GetReturn>().toHaveProperty('onboot').toBeBoolean();
        });

        it('has startup as string', () => {
            expectTypeOf<GetReturn>().toHaveProperty('startup').toBeString();
        });

        it('has lock', () => {
            expectTypeOf<GetReturn>().toHaveProperty('lock');
        });

        it('has memory as number', () => {
            expectTypeOf<GetReturn>().toHaveProperty('memory').toBeNumber();
        });

        it('has tags as string', () => {
            expectTypeOf<GetReturn>().toHaveProperty('tags').toBeString();
        });

        it('has lxc array', () => {
            expectTypeOf<GetReturn>().toHaveProperty('lxc').toBeArray();
        });

        it('has unused[n]', () => {
            expectTypeOf<GetReturn>().toHaveProperty('unused[n]').toBeString();
        });
    });

    describe('PUT body has LXC-specific properties', () => {
        it('has arch', () => {
            expectTypeOf<PutBody>().toHaveProperty('arch');
        });

        it('has cmode', () => {
            expectTypeOf<PutBody>().toHaveProperty('cmode');
        });

        it('has mp[n]', () => {
            expectTypeOf<PutBody>().toHaveProperty('mp[n]');
        });

        it('has rootfs', () => {
            expectTypeOf<PutBody>().toHaveProperty('rootfs');
        });

        it('has hostname', () => {
            expectTypeOf<PutBody>().toHaveProperty('hostname');
        });

        it('has ha-managed', () => {
            expectTypeOf<PutBody>().toHaveProperty('ha-managed');
        });

        it('has skiplock', () => {
            expectTypeOf<PutBody>().toHaveProperty('skiplock');
        });

        it('has revert', () => {
            expectTypeOf<PutBody>().toHaveProperty('revert');
        });

        it('has storage', () => {
            expectTypeOf<PutBody>().toHaveProperty('storage');
        });

        it('has delete', () => {
            expectTypeOf<PutBody>().toHaveProperty('delete');
        });

        it('has digest', () => {
            expectTypeOf<PutBody>().toHaveProperty('digest');
        });

        it('has unprivileged', () => {
            expectTypeOf<PutBody>().toHaveProperty('unprivileged');
        });

        it('has features', () => {
            expectTypeOf<PutBody>().toHaveProperty('features');
        });

        it('has entrypoint', () => {
            expectTypeOf<PutBody>().toHaveProperty('entrypoint');
        });

        it('has env', () => {
            expectTypeOf<PutBody>().toHaveProperty('env');
        });

        it('has lxc array', () => {
            expectTypeOf<PutBody>().toHaveProperty('lxc');
        });

        it('has swap', () => {
            expectTypeOf<PutBody>().toHaveProperty('swap');
        });

        it('has tty', () => {
            expectTypeOf<PutBody>().toHaveProperty('tty');
        });

        it('has timezone', () => {
            expectTypeOf<PutBody>().toHaveProperty('timezone');
        });

        it('has console', () => {
            expectTypeOf<PutBody>().toHaveProperty('console');
        });

        it('has cores', () => {
            expectTypeOf<PutBody>().toHaveProperty('cores');
        });

        it('has memory', () => {
            expectTypeOf<PutBody>().toHaveProperty('memory');
        });

        it('has net[n]', () => {
            expectTypeOf<PutBody>().toHaveProperty('net[n]');
        });

        it('has nameserver', () => {
            expectTypeOf<PutBody>().toHaveProperty('nameserver');
        });

        it('has searchdomain', () => {
            expectTypeOf<PutBody>().toHaveProperty('searchdomain');
        });

        it('has onboot', () => {
            expectTypeOf<PutBody>().toHaveProperty('onboot');
        });

        it('has ostype', () => {
            expectTypeOf<PutBody>().toHaveProperty('ostype');
        });

        it('has protection', () => {
            expectTypeOf<PutBody>().toHaveProperty('protection');
        });

        it('has tags', () => {
            expectTypeOf<PutBody>().toHaveProperty('tags');
        });

        it('has template', () => {
            expectTypeOf<PutBody>().toHaveProperty('template');
        });

        it('has startup', () => {
            expectTypeOf<PutBody>().toHaveProperty('startup');
        });

        it('has lock', () => {
            expectTypeOf<PutBody>().toHaveProperty('lock');
        });

        it('has dev[n]', () => {
            expectTypeOf<PutBody>().toHaveProperty('dev[n]');
        });

        it('has unused[n]', () => {
            expectTypeOf<PutBody>().toHaveProperty('unused[n]');
        });
    });

    describe('arch property uses LXC arch values not QEMU values', () => {
        it('GET return arch is amd64 not x86_64', () => {
            expectTypeOf<GetReturn['arch']>().toMatchTypeOf<'amd64' | 'i386' | 'arm64' | 'armhf' | 'riscv32' | 'riscv64' | undefined>();
        });

        it('PUT body arch is amd64 not x86_64', () => {
            expectTypeOf<PutBody['arch']>().toMatchTypeOf<'amd64' | 'i386' | 'arm64' | 'armhf' | 'riscv32' | 'riscv64' | undefined>();
        });
    });

    describe('ostype property uses LXC distro values not QEMU values', () => {
        it('GET return ostype is LXC distros', () => {
            expectTypeOf<GetReturn['ostype']>().toMatchTypeOf<'debian' | 'devuan' | 'ubuntu' | 'centos' | 'fedora' | 'opensuse' | 'archlinux' | 'alpine' | 'gentoo' | 'nixos' | 'unmanaged' | undefined>();
        });

        it('PUT body ostype is LXC distros', () => {
            expectTypeOf<PutBody['ostype']>().toMatchTypeOf<'debian' | 'devuan' | 'ubuntu' | 'centos' | 'fedora' | 'opensuse' | 'archlinux' | 'alpine' | 'gentoo' | 'nixos' | 'unmanaged' | undefined>();
        });
    });

    describe('QEMU-only properties are absent from LXC config', () => {
        it('bios should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('bios');
        });

        it('cdrom should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('cdrom');
        });

        it('hostpci should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('hostpci[n]');
        });

        it('kvm should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('kvm');
        });

        it('vga should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('vga');
        });

        it('bootdisk should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('bootdisk');
        });

        it('hugepages should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('hugepages');
        });

        it('efidisk0 should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('efidisk0');
        });

        it('tpmstate0 should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('tpmstate0');
        });

        it('sata should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('sata[n]');
        });

        it('scsi should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('scsi[n]');
        });

        it('scsihw should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('scsihw');
        });

        it('vcpus should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('vcpus');
        });

        it('sockets should not exist on GET return', () => {
            expectTypeOf<GetReturn>().not.toHaveProperty('sockets');
        });

        it('bios should not exist on PUT body', () => {
            expectTypeOf<PutBody>().not.toHaveProperty('bios');
        });

        it('cdrom should not exist on PUT body', () => {
            expectTypeOf<PutBody>().not.toHaveProperty('cdrom');
        });

        it('kvm should not exist on PUT body', () => {
            expectTypeOf<PutBody>().not.toHaveProperty('kvm');
        });

        it('vga should not exist on PUT body', () => {
            expectTypeOf<PutBody>().not.toHaveProperty('vga');
        });

        it('bootdisk should not exist on PUT body', () => {
            expectTypeOf<PutBody>().not.toHaveProperty('bootdisk');
        });

        it('hugepages should not exist on PUT body', () => {
            expectTypeOf<PutBody>().not.toHaveProperty('hugepages');
        });
    });
});
