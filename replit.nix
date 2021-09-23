{ pkgs }: {
	deps = [
		pkgs.nodejs-16_x
		pkgs.libtool
		pkgs.autoconf
		pkgs.pythonFull
		pkgs.automake
		pkgs.libsodium
	];
}