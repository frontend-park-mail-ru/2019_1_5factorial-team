package main

import (
	"fmt"
	"hash/crc32"
	"sort"
	"syscall/js"
	"time"
)

var (
	beforeUnloadCh = make(chan struct{})
	images         = [...]string{
		"002-devil",
		"003-superhero",
		"004-superhero-1",
		"005-superhero-2",
		"006-superhero-3",
		"007-superhero-4",
		"008-superhero-5",
		"009-superhero-6",
		"010-superhero-7",
		"011-villian",
		"012-superhero-8",
		"015-superhero-9",
		"016-superhero-10",
		"017-superhero-11",
		"018-superhero-12",
	}

	dict   = make(map[uint32]string)
	hashes = make([]uint32, 0, 1)
)

type DirRange []uint32

func (a DirRange) Len() int           { return len(a) }
func (a DirRange) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a DirRange) Less(i, j int) bool { return a[i] < a[j] }

func init() {
	for _, val := range images {
		hash := CalcHash(val)
		dict[hash] = val
		hashes = append(hashes, hash)
	}
	sort.Sort(DirRange(hashes))
	for i, v := range hashes {
		fmt.Println(i, v)
	}
}

func main() {
	callback := js.NewCallback(getCustomAvatar)
	defer callback.Release()
	setPrintMessage := js.Global().Get("setCustomAvatar")
	setPrintMessage.Invoke(callback)

	beforeUnloadCb := js.NewEventCallback(0, beforeUnload)
	defer beforeUnloadCb.Release()
	addEventListener := js.Global().Get("addEventListener")
	addEventListener.Invoke("beforeunload", beforeUnloadCb)

	<-beforeUnloadCh
	fmt.Println("Bye Wasm !")
}

func beforeUnload(event js.Value) {
	beforeUnloadCh <- struct{}{}
}

func getCustomAvatar(args []js.Value) {
	login := args[0].String()
	email := args[1].String()

	hashingVal := fmt.Sprintf("%s_%s_%s", login, email, time.Now().String())

	val := CalcHash(hashingVal)

	closestVal := binarySearch(hashes, val)

	avatar := js.Global().Get("document").Call("getElementById", "js-user-avatar")
	avatar.Set("src", dict[closestVal])
}

func CalcHash(str string) uint32 {
	crcH := crc32.ChecksumIEEE([]byte(str))

	return crcH
}

func binarySearch(sl []uint32, val uint32) uint32 {
	if sl[0] > val {
		return sl[0]
	}

	if sl[len(sl)-1] < val {
		return sl[len(sl)-1]
	}

	lo := 0
	hi := len(sl) - 1

	for lo <= hi {
		mid := (hi + lo) / 2

		if val < sl[mid] {
			hi = mid - 1
		} else if val > sl[mid] {
			lo = mid + 1
		} else {
			return sl[mid]
		}
	}

	if sl[lo]-val < val-sl[hi] {
		return sl[lo]
	}

	return sl[hi]
}
